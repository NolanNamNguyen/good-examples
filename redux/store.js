import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './rootReducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const a = 'aosdijf';
asdfasdf

const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== 'production',
  // eslint-disable-next-line no-shadow
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
});

sagaMiddleware.run(rootSaga);

export default store;
a
asdfsadf
