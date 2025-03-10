import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, UserActionTypes } from "../actions/userActions";

export interface UserState {
    userName: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userName: null,
    loading: false,
    error: null,
};

const userReducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, userName: action.payload };
        case FETCH_USER_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default userReducer;
