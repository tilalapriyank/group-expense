import { Group } from "../../types/groupTypes";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const FETCH_GROUPS_SUCCESS = "FETCH_GROUPS_SUCCESS";
export const FETCH_GROUPS_FAILURE = "FETCH_GROUPS_FAILURE";

export const CREATE_GROUP = "CREATE_GROUP";
export const JOIN_GROUP_REQUEST = "JOIN_GROUP_REQUEST";
export const JOIN_GROUP_SUCCESS = "JOIN_GROUP_SUCCESS";
export const JOIN_GROUP_FAILURE = "JOIN_GROUP_FAILURE";
export const DELETE_GROUP_REQUEST = "DELETE_GROUP_REQUEST";
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
export const DELETE_GROUP_FAILURE = "DELETE_GROUP_FAILURE";

export const FETCH_GROUP_DETAILS = 'FETCH_GROUP_DETAILS';
export const FETCH_GROUP_DETAILS_SUCCESS = 'FETCH_GROUP_DETAILS_SUCCESS';
export const FETCH_GROUP_DETAILS_FAILED = 'FETCH_GROUP_DETAILS_FAILED';

export const fetchGroupDetails = (groupId: string) => ({
    type: FETCH_GROUP_DETAILS,
    payload: groupId,
});

export const fetchGroupDetailsSuccess = (groupDetails: any) => ({
    type: FETCH_GROUP_DETAILS_SUCCESS,
    payload: groupDetails,
});

export const fetchGroupDetailsFailed = (error: any) => ({
    type: FETCH_GROUP_DETAILS_FAILED,
    payload: error,
});

export const fetchGroups = () => ({
    type: FETCH_GROUPS,
});

export const fetchGroupsSuccess = (groups: Group[]) => ({
    type: FETCH_GROUPS_SUCCESS,
    payload: groups,
});

export const fetchGroupsFailure = (error: string) => ({
    type: FETCH_GROUPS_FAILURE,
    payload: error,
});

export const createGroup = (name: string) => ({
    type: CREATE_GROUP,
    payload: name,
});

export const joinGroupRequest = (groupCode: string) => ({
    type: JOIN_GROUP_REQUEST,
    payload: groupCode,
});

export const joinGroupSuccess = (group: Group) => ({
    type: JOIN_GROUP_SUCCESS,
    payload: group,
});

export const joinGroupFailure = (error: string) => ({
    type: JOIN_GROUP_FAILURE,
    payload: error,
});

export const deleteGroupRequest = (groupId: string) => ({
    type: DELETE_GROUP_REQUEST,
    payload: groupId,
});

export const deleteGroupSuccess = (groupId: string) => ({
    type: DELETE_GROUP_SUCCESS,
    payload: groupId,
});

export const deleteGroupFailure = (error: string) => ({
    type: DELETE_GROUP_FAILURE,
    payload: error,
});
