import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } from "../../types/authTypes";
import axios from "axios";

const loginApi = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    return response.data;
};

const registerApi = async (name: string, email: string, password: string) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
    return response.data;
};

function* loginSaga(action: any): Generator<any, void, any> {
    try {
        const { email, password } = action.payload;
        const data = yield call(loginApi, email, password);
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        yield put({ type: LOGIN_SUCCESS, payload: data });
    } catch (error: unknown) {
        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: LOGIN_FAILURE, payload: errorMessage });
    }
}

function* registerSaga(action: any): Generator<any, void, any> {
    try {
        const { name, email, password } = action.payload;
        const data = yield call(registerApi, name, email, password);
        yield put({ type: REGISTER_SUCCESS, payload: data });
    } catch (error: unknown) {
        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put({ type: REGISTER_FAILURE, payload: errorMessage });
    }
}

export function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(REGISTER_REQUEST, registerSaga);
}
