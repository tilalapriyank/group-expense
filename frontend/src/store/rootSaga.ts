import { all } from "redux-saga/effects";
import { authSaga } from "./sagas/authSaga";
import { watchUserSaga } from './sagas/userSaga';
import { watchGroupActions } from "./sagas/groupSagas";
import { watchExpenseActions } from "./sagas/expenseSaga";
import { watchSettlementActions } from "./sagas/settlementSaga";
import { watchProfileActions } from "./sagas/profileSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    watchUserSaga(),
    watchGroupActions(),
    watchExpenseActions(),
    watchSettlementActions(),
    watchProfileActions()
  ]);
}
