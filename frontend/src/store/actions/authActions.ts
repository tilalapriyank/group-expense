import { LOGIN_REQUEST, REGISTER_REQUEST } from "../../types/authTypes";

export const loginRequest = (email: string, password: string) => ({
    type: LOGIN_REQUEST,
    payload: { email, password },
});

export const registerRequest = (name: string, email: string, password: string) => ({
    type: REGISTER_REQUEST,
    payload: { name, email, password }
});

