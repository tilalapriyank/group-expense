import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, UserActionTypes } from "../actions/userActions";

interface UserState {
    userName: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userName: null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    console.log(action);
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { ...state, loading: true };
        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, userName: action.payload };
        case FETCH_USER_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default userReducer;
