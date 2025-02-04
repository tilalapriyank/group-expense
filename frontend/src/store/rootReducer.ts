import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
