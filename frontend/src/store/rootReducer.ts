import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from './reducers/userReducer';
import groupReducer from "./reducers/groupReducer";
import expenseReducer from "./reducers/expenseReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    groups: groupReducer,
    expenses: expenseReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
