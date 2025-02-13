import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actions/userActions";
import { API_ENDPOINTS } from "../../services/config";

const getAuthToken = (): string | null => localStorage.getItem("token");

interface FetchUserAction {
    type: string;
    userId: string;
}

interface UserResponse {
    name?: string;
}

function* fetchUserSaga(action: FetchUserAction): Generator<any, void, any> {
    try {
        const token = getAuthToken();

        if (!token) {
            throw new Error("No token provided");
        }

        const response: Response = yield call(fetch, API_ENDPOINTS.USER.FETCH_USER(action.userId), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data: UserResponse[] = yield call([response, "json"]);

        if (Array.isArray(data) && data[0]?.name) {
            yield put({ type: FETCH_USER_SUCCESS, payload: data[0].name });
        } else {
            throw new Error("User not found");
        }
    } catch (error: unknown) {
        yield put({ type: FETCH_USER_FAILURE, error: error instanceof Error ? error.message : "Failed to fetch user" });
    }
}

export function* watchUserSaga(): Generator {
    yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}