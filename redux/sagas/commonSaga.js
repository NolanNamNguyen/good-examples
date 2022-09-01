import { all, takeEvery } from 'redux-saga/effects';

import { testSagaFunction } from '../slices/commonSlice';

function* testThisSaga(params) {
  // eslint-disable-next-line no-console
  console.log('Im testing', params);
}

function* commonSaga() {
  yield all([takeEvery(testSagaFunction.type, testThisSaga)]);
}

export default commonSaga;
