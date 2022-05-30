import { all } from 'redux-saga/effects';
import commonSaga from './sagas/commonSaga';

export default function* rootSaga() {
  yield all([commonSaga()]);
}
