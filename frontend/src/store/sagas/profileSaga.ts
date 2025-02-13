import { fetchUserRequest } from './../actions/userActions';
import { message } from "antd";
import { takeEvery, call, put } from "redux-saga/effects";
import {
    FETCH_PROFILE_REQUEST,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PASSWORD_REQUEST,
} from "../../types/userActionTypes";
import {
    fetchUserSuccess,
    fetchUserFailure,
    updateUserSuccess,
    updateUserFailure,
    updatePasswordSuccess,
    updatePasswordFailure,
    fetchProfileRequest,
} from "../actions/profileActions";
import { API_ENDPOINTS } from "../../services/config";

const getAuthToken = () => localStorage.getItem("token");

// ✅ Fetch User Profile
function* fetchUserSaga(): Generator<any, void, unknown> {
    try {
        const token = getAuthToken();
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.USER.PROFILE, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => res.json())
        );

        if (response && response.userId) {
            yield put(fetchUserSuccess(response));
        } else {
            yield put(fetchUserFailure("Failed to fetch user profile"));
        }
    } catch (error) {
        yield put(fetchUserFailure(error instanceof Error ? error.message : "An error occurred"));
    }
}

// ✅ Update User Profile
function* updateUserSaga(action: any): Generator<any, void, unknown> {
    try {
        const token = getAuthToken();

        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.USER.UPDATE, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(action.payload),
            }).then((res) => res.json())
        );

        if (response && response.userId) {
            yield put(updateUserSuccess(response));
            message.success("Profile updated successfully.");
            yield put(fetchProfileRequest());
            yield put(fetchUserRequest(response.userId));
        } else {
            yield put(updateUserFailure("Failed to update profile"));
        }
    } catch (error) {
        yield put(updateUserFailure(error instanceof Error ? error.message : "An error occurred"));
    }
}

// ✅ Change Password
function* updatePasswordSaga(action: any): Generator<any, void, unknown> {
    try {
        const token = getAuthToken();
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.USER.CHANGE_PASSWORD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password: action.payload }),
            }).then((res) => res.json())
        );

        if (response && response.message === "Password updated successfully") {
            yield put(updatePasswordSuccess());
            message.success("Password updated successfully.");
        } else {
            yield put(updatePasswordFailure("Failed to update password"));
        }
    } catch (error) {
        yield put(updatePasswordFailure(error instanceof Error ? error.message : "An error occurred"));
    }
}

// ✅ Watcher Saga
export function* watchProfileActions(): Generator<any, void, unknown> {
    yield takeEvery(FETCH_PROFILE_REQUEST, fetchUserSaga);
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateUserSaga);
    yield takeEvery(UPDATE_PASSWORD_REQUEST, updatePasswordSaga);
}
