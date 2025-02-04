import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';

const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
});

export default rootReducer;
