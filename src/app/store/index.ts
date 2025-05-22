import { configureStore, createDynamicMiddleware, type MiddlewareApiConfig } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { useDispatch } from 'react-redux';

const dynamicMiddleware = createDynamicMiddleware();

const { addMiddleware } = dynamicMiddleware;

export const addAppMiddleware = addMiddleware.withTypes<MiddlewareApiConfig>();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(dynamicMiddleware.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppState = ReturnType<typeof store.getState>;
