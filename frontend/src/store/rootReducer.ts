import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from './reducers/userReducer';
import groupReducer from "./reducers/groupReducer";
import expenseReducer from "./reducers/expenseReducer";
import settlementReducer from "./reducers/settlementReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    groups: groupReducer,
    expenses: expenseReducer,
    settlements: settlementReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
