import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { COOKIE_FIELD } from '@constant/common';

const initialState = {
  loadingToken: false,
  loadingProfile: false,
  userProfile: null,
  navigateCode: false,
  checkString: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    getToken: {
      reducer: (state) => {
        state.loadingToken = true;
        state.checkString = 'logged in';
      },
      prepare: (params, errorCallback) => {
        return { payload: { params, errorCallback } };
      },
    },
    getTokenSuccess: (state, { payload }) => {
      state.loadingToken = false;
      Cookies.set(COOKIE_FIELD.access_token, payload.access_token);
      Cookies.set(COOKIE_FIELD.refresh_token, payload.refresh_token);
    },
    getTokenFailed: (state) => {
      state.loadingToken = false;
    },

    refreshToken: () => {},
    refreshTokenSuccess: (state, { payload }) => {
      state.loadingToken = false;
      Cookies.set(COOKIE_FIELD.access_token, payload.access_token);
      Cookies.set(COOKIE_FIELD.refresh_token, payload.refresh_token);
    },
    refreshTokenFailed: (state) => {
      state.loadingToken = false;
    },

    getUserProfile: (state) => {
      state.loadingProfile = true;
    },
    getUserProfileSuccess: (state, { payload }) => {
      Cookies.set(COOKIE_FIELD.scope_type, payload.type);
      state.userProfile = payload;
      state.loadingProfile = false;
    },
    getUserProfileFailed: (state) => {
      state.userProfile = initialState.userProfile;
      state.loadingProfile = false;
    },

    invokeNavigate: (state, { payload }) => {
      state.navigateCode = payload;
    },
  },
});

export const {
  getToken,
  getTokenSuccess,
  getTokenFailed,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailed,
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFailed,
  invokeNavigate,
} = authSlice.actions;

export default authSlice.reducer;
