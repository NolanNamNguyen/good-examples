import { all, takeEvery, put } from 'redux-saga/effects';
import { toggleNotifier } from '@reduxSlices/commonSlice';
import {
  getToken,
  getTokenSuccess,
  getTokenFailed,
  refreshToken,
  getUserProfileSuccess,
  getUserProfileFailed,
  getUserProfile,
  refreshTokenSuccess,
  refreshTokenFailed,
} from '@reduxSlices/authSlice';
import Api, { grantTokenConfig } from '@apiConfig';
import Cookies from 'js-cookie';
import { GET_AUTH_TOKEN, GET_ME } from '@constant/endpoint';
import { COOKIE_FIELD, TOKEN_GRANT_TYPE } from '@constant/common';
import { convertToURLEncoded } from '@utils/utils';

function* handleGetUserProfile({ payload: { callback, errorCallback } }) {
  try {
    const response = yield Api.get(GET_ME);
    yield put(getUserProfileSuccess(response?.data));
    callback?.();
  } catch (error) {
    errorCallback?.();
    yield put(getUserProfileFailed(error.response?.data));
  }
}

function* handleGrantToken({
  payload: {
    params: { callback, ...params },
    errorCallback,
  },
}) {
  try {
    const requestParams = convertToURLEncoded(params);
    const response = yield Api.post(GET_AUTH_TOKEN.endpoint, requestParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...grantTokenConfig,
    });
    yield put(getTokenSuccess(response.data));
    callback?.();
  } catch (error) {
    errorCallback?.();
    yield put(
      toggleNotifier({
        openState: true,
        notifyType: 'error',
        notifyMessage: 'Problem while processing your request',
      }),
    );
    yield put(getTokenFailed(error));
  }
}

function* handleRefreshToken({ payload: { userType, callback } }) {
  if (userType && Cookies.get(COOKIE_FIELD.refresh_token)) {
    try {
      const params = {
        [GET_AUTH_TOKEN.params.grant_type]: TOKEN_GRANT_TYPE.refresh_token,
        [GET_AUTH_TOKEN.params.scope]: userType,
        [GET_AUTH_TOKEN.params.refresh_token]: Cookies.get(
          COOKIE_FIELD.refresh_token,
        ),
      };
      const requestParams = convertToURLEncoded(params);
      const response = yield Api.post(GET_AUTH_TOKEN.endpoint, requestParams, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...grantTokenConfig,
      });
      yield put(refreshTokenSuccess(response.data));
      callback?.();
    } catch (error) {
      yield put(
        toggleNotifier({
          openState: true,
          notifyType: 'error',
          notifyMessage: 'Problem while processing your request',
        }),
      );
      yield put(refreshTokenFailed(error.response?.data));
    }
  }
}

function* authSaga() {
  yield all([
    takeEvery(getToken.type, handleGrantToken),
    takeEvery(refreshToken.type, handleRefreshToken),
    takeEvery(getUserProfile.type, handleGetUserProfile),
  ]);
}

export default authSaga;
