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
  } from "../../types/userActionTypes";
  
  // Define user object structure
  export interface User {
    id: string;
    name: string;
    email: string;
    upiId: string;
  }
  
  // Action Interfaces
  interface FetchUserRequestAction {
    type: typeof FETCH_PROFILE_REQUEST;
  }
  
  interface FetchUserSuccessAction {
    type: typeof FETCH_PROFILE_SUCCESS;
    payload: User;
  }
  
  interface FetchUserFailureAction {
    type: typeof FETCH_PROFILE_FAILURE;
    payload: string;
  }
  
  interface UpdateUserRequestAction {
    type: typeof UPDATE_PROFILE_REQUEST;
    payload: User;
  }
  
  interface UpdateUserSuccessAction {
    type: typeof UPDATE_PROFILE_SUCCESS;
    payload: User;
  }
  
  interface UpdateUserFailureAction {
    type: typeof UPDATE_PROFILE_FAILURE;
    payload: string;
  }
  
  interface UpdatePasswordRequestAction {
    type: typeof UPDATE_PASSWORD_REQUEST;
    payload: string;
  }
  
  interface UpdatePasswordSuccessAction {
    type: typeof UPDATE_PASSWORD_SUCCESS;
  }
  
  interface UpdatePasswordFailureAction {
    type: typeof UPDATE_PASSWORD_FAILURE;
    payload: string;
  }
  
  // Export action types
  export type UserActionTypes =
    | FetchUserRequestAction
    | FetchUserSuccessAction
    | FetchUserFailureAction
    | UpdateUserRequestAction
    | UpdateUserSuccessAction
    | UpdateUserFailureAction
    | UpdatePasswordRequestAction
    | UpdatePasswordSuccessAction
    | UpdatePasswordFailureAction;
  
  // Action Creators
  export const fetchProfileRequest = (): FetchUserRequestAction => ({
    type: FETCH_PROFILE_REQUEST,
  });
  
  export const fetchUserSuccess = (user: User): FetchUserSuccessAction => ({
    type: FETCH_PROFILE_SUCCESS,
    payload: user,
  });
  
  export const fetchUserFailure = (error: string): FetchUserFailureAction => ({
    type: FETCH_PROFILE_FAILURE,
    payload: error,
  });
  
  export const updateUserRequest = (user: User): UpdateUserRequestAction => ({
    type: UPDATE_PROFILE_REQUEST,
    payload: user,
  });
  
  export const updateUserSuccess = (user: User): UpdateUserSuccessAction => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: user,
  });
  
  export const updateUserFailure = (error: string): UpdateUserFailureAction => ({
    type: UPDATE_PROFILE_FAILURE,
    payload: error,
  });
  
  export const updatePasswordRequest = (password: string): UpdatePasswordRequestAction => ({
    type: UPDATE_PASSWORD_REQUEST,
    payload: password,
  });
  
  export const updatePasswordSuccess = (): UpdatePasswordSuccessAction => ({
    type: UPDATE_PASSWORD_SUCCESS,
  });
  
  export const updatePasswordFailure = (error: string): UpdatePasswordFailureAction => ({
    type: UPDATE_PASSWORD_FAILURE,
    payload: error,
  });
  