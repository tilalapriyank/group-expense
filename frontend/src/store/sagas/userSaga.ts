import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actions/userActions";

const getAuthToken = () => {
    return localStorage.getItem("token");
};

function* fetchUserSaga(action: { id: string }) {
    try {
        const token = getAuthToken(); 

        if (!token) {
            throw new Error("No token provided");
        }

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/user/${action.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        );

        const data = yield response.json();

        if (response.ok && data && data.length > 0) {
            yield put({ type: FETCH_USER_SUCCESS, payload: data[0].name });
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        yield put({ type: FETCH_USER_FAILURE, error: error.message || "Failed to fetch user" });
    }
}

export function* watchUserSaga() {
    yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}
