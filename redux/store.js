import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootReducers from './rootReducers';
import rootSaga from './rootSaga';
import { injectStore } from '@apiConfig';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
});

const makeStore = () => {
  sagaMiddleware.run(rootSaga);
  injectStore(store);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
