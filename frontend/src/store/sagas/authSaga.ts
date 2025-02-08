import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } from "../../types/authTypes";
import axios from "axios";
import { API_ENDPOINTS } from "../../services/config";

const loginApi = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login API Error:", error.response?.data || error.message);
        throw error;
    }
};


const registerApi = async (userData: any) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
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
        const data = yield call(registerApi, action.payload);
        yield put({ type: REGISTER_SUCCESS, payload: data });
    } catch (error: unknown) {
        yield put({ type: REGISTER_FAILURE, payload: error.response?.data?.message || "Registration failed" });
    }
}

export function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(REGISTER_REQUEST, registerSaga);
}
