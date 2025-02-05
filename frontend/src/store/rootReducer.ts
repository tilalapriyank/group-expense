import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from './reducers/userReducer';
import groupReducer from "./reducers/groupReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    groups: groupReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
