import { message } from 'antd';
import { call, put, takeEvery, Effect } from "redux-saga/effects";
import {
    FETCH_GROUPS, CREATE_GROUP, JOIN_GROUP_REQUEST, DELETE_GROUP_REQUEST,
    fetchGroupDetailsSuccess, fetchGroupDetailsFailed, FETCH_GROUP_DETAILS,
    fetchGroupsSuccess, fetchGroups, joinGroupSuccess, joinGroupFailure,
    deleteGroupSuccess, deleteGroupFailure, fetchGroupsFailure
} from "../actions/groupActions";
import { API_ENDPOINTS } from "../../services/config";

const getAuthToken = (): string | null => {
    return localStorage.getItem("token");
};

function* fetchGroupsSaga(): Generator<Effect, void, unknown> {
    try {
        const token = getAuthToken();
        if (!token) {
            console.error("Authorization token is missing.");
            return;
        }
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.GROUPS.BASE, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
        );

        if (Array.isArray(response)) {
            yield put(fetchGroupsSuccess(response));
        } else {
            console.error("Invalid response format: Expected an array of groups.");
        }
    } catch (error) {
        console.error("Failed to fetch groups:", error);
        yield put(fetchGroupsFailure("Failed to fetch groups"));
    }
}

function* fetchGroupSaga(action: any): Generator<Effect, void, unknown> {
    try {
        const token = getAuthToken();
        const groupId = action.payload;
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.GROUPS.SINGLE(groupId), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
        );

        if (response && response.groupName) {
            yield put(fetchGroupDetailsSuccess(response));
        } else {
            console.error("Invalid response format: Expected a group object.");
            yield put(fetchGroupDetailsFailed("Invalid response format"));
        }
    } catch (error) {
        console.error("Failed to fetch group:", error);
        yield put(fetchGroupDetailsFailed("Failed to fetch group"));
    }
}

// Create group saga
function* createGroupSaga(action: any): Generator<Effect, void, unknown> {
    try {
        const token = getAuthToken();
        const groupName = { groupName: action.payload };
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.GROUPS.BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(groupName),
            }).then((res) => res.json())
        );

        console.log(response);

        if (response && response.message === "Group created successfully") {
            yield put(fetchGroups());
            message.success('Group created successfully.');
        } else {
            console.error("Failed to create group");
            message.error('Failed to create group.');
        }
    } catch (error) {
        console.error("Failed to create group", error);
    }
}

// Join group saga
function* joinGroupSaga(action: any): Generator<Effect, void, unknown> {
    try {
        const token = getAuthToken();
        const groupCode = { groupCode: action.payload };
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.GROUPS.JOIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(groupCode),
            }).then((res) => res.json())
        );

        console.log("Join Group Response:", response);

        if (response && response.message === "Successfully joined the group") {
            yield put(joinGroupSuccess(response.group));
            yield put(fetchGroups());
            message.success('Successfully joined the group.');
        } else {
            yield put(joinGroupFailure("Failed to join group"));
            console.error("Failed to join group");
        }
    } catch (error) {
        const err = error as Error; // Explicitly assert the error as type Error
        yield put(joinGroupFailure(err.message));
        console.error("Failed to join group:", err);
    }
}

function* deleteGroupSaga(action: any): Generator<Effect, void, unknown> {
    try {
        const token = getAuthToken();
        const groupId = action.payload;
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.GROUPS.SINGLE(groupId), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response && response.message === "Group deleted successfully") {
            yield put(deleteGroupSuccess(groupId));
            yield put(fetchGroups());
        } else {
            yield put(deleteGroupFailure("Failed to delete group"));
            message.error("Only the group creator can delete this group.");
        }
    } catch (error) {
        const err = error as Error;
        yield put(deleteGroupFailure(err.message));
        console.error("Failed to delete group:", err);
    }
}

// Watcher saga for all group actions
export function* watchGroupActions(): Generator<Effect, void, unknown> {
    yield takeEvery(FETCH_GROUPS, fetchGroupsSaga);
    yield takeEvery(CREATE_GROUP, createGroupSaga);
    yield takeEvery(JOIN_GROUP_REQUEST, joinGroupSaga);
    yield takeEvery(DELETE_GROUP_REQUEST, deleteGroupSaga);
    yield takeEvery(FETCH_GROUP_DETAILS, fetchGroupSaga);
}
