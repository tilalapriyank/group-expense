import { all } from 'redux-saga/effects';
import userSaga from './sagas/userSaga';
import groupSaga from './sagas/groupSaga';

export default function* rootSaga() {
  yield all([userSaga(), groupSaga()]);
}
