import { LOGIN_REQUEST, REGISTER_REQUEST } from "../../types/authTypes";

export const loginRequest = (email: string, password: string) => ({
    type: LOGIN_REQUEST,
    payload: { email, password },
});

export const registerRequest = (userData: any) => ({
    type: REGISTER_REQUEST,
    payload: userData
});