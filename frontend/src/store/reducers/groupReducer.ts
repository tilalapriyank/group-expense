import {
    FETCH_GROUPS_SUCCESS,
    FETCH_GROUPS_FAILURE,
    JOIN_GROUP_REQUEST,
    JOIN_GROUP_SUCCESS,
    JOIN_GROUP_FAILURE,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILURE,
} from "../actions/groupActions";
import { Group } from "../../types/groupTypes";

interface GroupState {
    groups: Group[];
    loading: boolean;
    error?: string;
}

const initialState: GroupState = {
    groups: [],
    loading: false,
    error: undefined,
};

const groupReducer = (state = initialState, action: any): GroupState => {
    switch (action.type) {
        case FETCH_GROUPS_SUCCESS:
            return { ...state, groups: action.payload, loading: false, error: undefined };

        case FETCH_GROUPS_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case JOIN_GROUP_REQUEST:
            return { ...state, loading: true, error: undefined };

        case JOIN_GROUP_SUCCESS:
            return {
                ...state,
                groups: [...state.groups, action.payload],
                loading: false,
                error: undefined
            };

        case JOIN_GROUP_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_GROUP_REQUEST:
            return { ...state, loading: true, error: undefined };

        case DELETE_GROUP_SUCCESS:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload),
                loading: false,
                error: undefined
            };

        case DELETE_GROUP_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default groupReducer;
