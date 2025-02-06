export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

interface FetchUserRequestAction {
    type: typeof FETCH_USER_REQUEST;
    userId: string;
}

interface FetchUserSuccessAction {
    type: typeof FETCH_USER_SUCCESS;
    payload: string;
}

interface FetchUserFailureAction {
    type: typeof FETCH_USER_FAILURE;
    error: string;
}

export const fetchUserRequest = (userId: string) => ({
    type: FETCH_USER_REQUEST,
    userId,
});


export type UserActionTypes =
    | FetchUserRequestAction
    | FetchUserSuccessAction
    | FetchUserFailureAction;
