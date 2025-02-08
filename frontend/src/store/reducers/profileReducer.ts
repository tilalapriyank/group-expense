import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    UserActionTypes,
  } from "../../types/userActionTypes";
  
  interface UserState {
    user: {
      id: string;
      name: string;
      email: string;
      upiId: string;
    } | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
      case FETCH_PROFILE_REQUEST:
      case UPDATE_PROFILE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_PROFILE_SUCCESS:
        return { ...state, loading: false, user: action.payload };
  
      case UPDATE_PROFILE_SUCCESS:
        return { ...state, loading: false, user: action.payload };
  
      case UPDATE_PASSWORD_SUCCESS:
        return { ...state, loading: false };
  
      case FETCH_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
      case UPDATE_PASSWORD_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default profileReducer;
  