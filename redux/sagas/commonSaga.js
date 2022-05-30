import { all, takeEvery } from 'redux-saga/effects';
// import Api from '../../config/api';

import { removeAllLogs } from '../slices/commonSlice';

function* uploadImageSaga(params) {
  // eslint-disable-next-line no-console
  console.log('params', params);
}

function* commonSaga() {
  yield all([takeEvery(removeAllLogs.type, uploadImageSaga)]);
}

export default commonSaga;
