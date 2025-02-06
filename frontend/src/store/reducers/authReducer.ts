import { AuthState, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../../types/authTypes";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token') || null,  // Load token from localStorage
    loading: false,
    error: null
};


const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return { ...state, loading: true, error: null }; // Clear previous errors

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null // Ensure error is cleared
            };

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};


export default authReducer;
