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
function* fetchUserSaga() {
    try {
        const token = getAuthToken();
        const response = yield call(() =>
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
        yield put(fetchUserFailure(error.message));
    }
}

// ✅ Update User Profile
function* updateUserSaga(action: any) {
    try {
        const token = getAuthToken();
        const response = yield call(() =>
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
        } else {
            yield put(updateUserFailure("Failed to update profile"));
        }
    } catch (error) {
        yield put(updateUserFailure(error.message));
    }
}

// ✅ Change Password
function* updatePasswordSaga(action: any) {
    try {
        const token = getAuthToken();
        const response = yield call(() =>
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
        yield put(updatePasswordFailure(error.message));
    }
}

// ✅ Watcher Saga
export function* watchProfileActions() {
    yield takeEvery(FETCH_PROFILE_REQUEST, fetchUserSaga);
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateUserSaga);
    yield takeEvery(UPDATE_PASSWORD_REQUEST, updatePasswordSaga);
}
