import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import throttle from 'lodash/throttle';
import mergeWith from 'lodash/mergeWith';
import {
  refreshToken,
  invokeNavigate,
  getUserProfileFailed,
  getUserProfile,
} from '@reduxSlices/authSlice';
import Cookies from 'js-cookie';
import { API_URL, CLIENT_PASS, CLIENT_ID } from './setting';
import { COOKIE_FIELD } from '@constant/common';

const THROTTLE_DELAY = 1000;

let reduxStore;

export const injectStore = (_store) => {
  reduxStore = _store;
};

export const generateAppServiceToken = () => ({
  // 'X-Mobile-Device-Type': process.env.HEADER_X_MOBILE_DEVICE_TYPE,
  Authorization: `Bearer ${Cookies.get(COOKIE_FIELD.access_token)}`,
});

export const grantTokenConfig = {
  auth: {
    username: CLIENT_ID,
    password: CLIENT_PASS,
  },
};

const defaultOptions = {
  // withCredentials: true,
};

// eslint-disable-next-line default-param-last
function getApi(path, options = {}, apiURL) {
  return axios.get(`${apiURL || API_URL}${path}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateAppServiceToken(),
    },
  });
}

function postApi(path, data, options = {}) {
  const headerParams = mergeWith(options.headers, generateAppServiceToken());

  return axios.post(`${API_URL}${path}`, data, {
    ...defaultOptions,
    headers: headerParams,
    ...options,
  });
}

function putApi(path, data, options = {}) {
  return axios.put(`${API_URL}${path}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateAppServiceToken(),
    },
  });
}

function deleteApi(path, options = {}) {
  return axios.delete(`${API_URL}${path}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateAppServiceToken(),
    },
  });
}

function uploadApi(path, params, options = {}, uploadSingle = false) {
  const { layout_site_id, layout_id } = params;
  const ListFile = [params[Object.keys(params)[0]]];
  if (!ListFile || isEmpty(ListFile)) return;

  const formData = new FormData();
  uploadSingle
    ? ListFile.forEach((file) => {
        formData.append(`file`, file);
        layout_site_id && formData.append('layout_site_id', layout_site_id);
        layout_id && formData.append('layout_id', layout_id);
      })
    : ListFile.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
        layout_site_id && formData.append('layout_site_id', layout_site_id);
        layout_id && formData.append('layout_id', layout_id);
      });

  return axios.post(`${API_URL}${path}`, formData, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'multipart/form-data',
      ...generateAppServiceToken(),
    },
  });
}

const notAuthorizedCallback = throttle(() => {
  if (Cookies.get(COOKIE_FIELD.refresh_token)) {
    reduxStore.dispatch(
      refreshToken({
        userType: Cookies.get(COOKIE_FIELD.scope_type),
        callback: () => {
          reduxStore.dispatch(getUserProfile({ payload: {} }));
        },
      }),
    );
    return;
  }
  reduxStore.dispatch(invokeNavigate(true));
}, THROTTLE_DELAY);

const forbiddenCallback = throttle(() => {
  for (const key of Object.keys(COOKIE_FIELD)) {
    Cookies.remove(key);
  }
  reduxStore.dispatch(getUserProfileFailed());
  reduxStore.dispatch(invokeNavigate(true));
}, THROTTLE_DELAY);

const handleErrors = (serverResponse) => {
  if (serverResponse.status === 401) {
    notAuthorizedCallback();
    return serverResponse;
  }
  if (serverResponse.status === 503) {
    forbiddenCallback();
    return serverResponse;
  }
  return null;
};

axios.interceptors.response.use(
  (response) => {
    if (handleErrors(response)) return;
    return response;
  },
  (error) => {
    if (handleErrors(error.response)) return;
    return Promise.reject(error);
  },
);

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  upload: uploadApi,
};

export default Api;
