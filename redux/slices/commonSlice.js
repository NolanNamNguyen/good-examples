import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  logs: '',
  saving: false,
};

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    testSagaFunction: (state) => {
      state.logs = 'Installed successfully';
    },
    logError: {
      reducer: (state, action) => {
        // eslint-disable-next-line no-console
        console.log('log payload from prepare', action.payload);
        state.saving = true;
      },
      prepare: (
        file,
        callback,
        isUploadSingleImage,
        endpointAPI,
        extraParams,
      ) => ({
        payload: {
          file,
          callback,
          isUploadSingleImage,
          endpointAPI,
          extraParams,
        },
      }),
    },
  },
});

export const { testSagaFunction, logError } = commonSlice.actions;

export default commonSlice.reducer;
