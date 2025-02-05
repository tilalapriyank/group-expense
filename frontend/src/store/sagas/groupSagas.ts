import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GROUPS, CREATE_GROUP, JOIN_GROUP_REQUEST, DELETE_GROUP_REQUEST } from "../actions/groupActions";
import { fetchGroupsSuccess, fetchGroups, joinGroupSuccess, joinGroupFailure, deleteGroupSuccess, deleteGroupFailure } from "../actions/groupActions";


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
            yield put(fetchGroupsSuccess(response)); // API returns array directly
        } else {
            console.error("Invalid response format: Expected an array of groups.");
        }
    } catch (error) {
        console.error("Failed to fetch groups:", error);
    }
}

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

        if (response && response.success) {
            yield put(fetchGroups());
        } else {
            console.error("Failed to create group");
        }
    } catch (e) {
        console.error("Failed to create group", e);
    }
}

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

        if (response && response.success) {
            yield put(joinGroupSuccess(response.group));
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

        if (response && response.success) {
            yield put(deleteGroupSuccess(groupId));
        } else {
            yield put(deleteGroupFailure("Failed to delete group"));
            console.error("Failed to delete group");
        }
    } catch (error) {
        yield put(deleteGroupFailure(error.message));
        console.error("Failed to delete group:", error);
    }
}

function* fetchGroupDetailsSaga(action: any) {
    try {
        const groupDetails = yield call(fetchGroupData, action.payload);
        yield put(fetchGroupDetailsSuccess(groupDetails));
    } catch (error) {
        yield put(fetchGroupDetailsFailed(error));
    }
}



export function* watchGroupActions() {
    yield takeEvery(FETCH_GROUPS, fetchGroupsSaga);
    yield takeEvery(CREATE_GROUP, createGroupSaga);
    yield takeEvery(JOIN_GROUP_REQUEST, joinGroupSaga);
    yield takeEvery(DELETE_GROUP_REQUEST, deleteGroupSaga);
}

