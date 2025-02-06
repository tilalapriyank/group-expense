import { message } from 'antd';
import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GROUPS, CREATE_GROUP, JOIN_GROUP_REQUEST, DELETE_GROUP_REQUEST, fetchGroupDetailsSuccess, fetchGroupDetailsFailed, FETCH_GROUP_DETAILS } from "../actions/groupActions";
import { fetchGroupsSuccess, fetchGroups, joinGroupSuccess, joinGroupFailure, deleteGroupSuccess, deleteGroupFailure, fetchGroupsFailure } from "../actions/groupActions";

const getAuthToken = () => {
    return localStorage.getItem("token");
};

function* fetchGroupsSaga() {
    try {
        const token = getAuthToken();
        if (!token) {
            console.error("Authorization token is missing.");
            return;
        }
        const response = yield call(() =>
            fetch("http://192.168.1.19:5000/api/groups", {
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


function* fetchGroupSaga(action: any) {
    try {
        const token = getAuthToken();
        const groupId = action.payload; 
        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/groups/${groupId}`, {
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
function* createGroupSaga(action: any) {
    try {
        const token = getAuthToken();
        const groupName = { groupName: action.payload };
        const response = yield call(() =>
            fetch("http://192.168.1.19:5000/api/groups", {
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
    } catch (e) {
        console.error("Failed to create group", e);
    }
}

// Join group saga
function* joinGroupSaga(action: any) {
    try {
        const token = getAuthToken();
        const groupCode = { groupCode: action.payload };
        const response = yield call(() =>
            fetch("http://192.168.1.19:5000/api/groups/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(groupCode),
            }).then((res) => res.json())
        );

        console.log("Join Group Response:", response);

        if (response && response.message == "Successfully joined the group") {
            yield put(joinGroupSuccess(response.group));
            yield put(fetchGroups());
            message.success('Successfully joined the group.');
        } else {
            yield put(joinGroupFailure("Failed to join group"));
            console.error("Failed to join group");
        }
    } catch (error) {
        yield put(joinGroupFailure(error.message));
        console.error("Failed to join group:", error);
    }
}

function* deleteGroupSaga(action: any) {
    try {
        const token = getAuthToken();
        const groupId = action.payload;
        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/groups/${groupId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response && response.message == "Group deleted successfully") {
            yield put(deleteGroupSuccess(groupId));
            yield put(fetchGroups());
        } else {
            yield put(deleteGroupFailure("Failed to delete group"));
            message.error("Only the group creator can delete this group.");
        }
    } catch (error) {
        yield put(deleteGroupFailure(error.message));
        console.error("Failed to delete group:", error);
    }
}

// Watcher saga for all group actions
export function* watchGroupActions() {
    yield takeEvery(FETCH_GROUPS, fetchGroupsSaga);
    yield takeEvery(CREATE_GROUP, createGroupSaga);
    yield takeEvery(JOIN_GROUP_REQUEST, joinGroupSaga);
    yield takeEvery(DELETE_GROUP_REQUEST, deleteGroupSaga);
    yield takeEvery(FETCH_GROUP_DETAILS, fetchGroupSaga);
}
