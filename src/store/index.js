import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chatReducer from '../reducers/chatReducer';
import { watchChatActions } from '../sagas/chatSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = chatReducer;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(watchChatActions);

export default store;
