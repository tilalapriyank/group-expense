import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actions/userActions";

const getAuthToken = () => localStorage.getItem("token");

function* fetchUserSaga(action: { type: string; userId: string }) {
    try {
        const token = getAuthToken();

        if (!token) {
            throw new Error("No token provided");
        }

        const response = yield call(fetch, `http://192.168.1.19:5000/api/user/${action.userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = yield call([response, "json"]);

        if (data[0]?.name) {
            yield put({ type: FETCH_USER_SUCCESS, payload: data[0].name });
        } else {
            throw new Error("User not found");
        }
    } catch (error: unknown) {
        yield put({ type: FETCH_USER_FAILURE, error: error instanceof Error ? error.message : "Failed to fetch user" });
    }
}

export function* watchUserSaga() {
    yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}
