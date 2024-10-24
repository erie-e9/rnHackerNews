// import { api } from '@hooks/api/api';
import { useTodosApi, useArticlesApi } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import {
  appPreferences,
  articles,
  favorites,
  responseHandler,
  todos,
} from '@slices/shared';

export type reducerTypes = 'appPreferences' | 'articles' | 'favorites' | 'responseHandler' | 'todos';

export const reducers = combineReducers({
  appPreferences,
  favorites,
  responseHandler,
  todos,
  articles,
  [useTodosApi.reducerPath]: useTodosApi.reducer,
  [useArticlesApi.reducerPath]: useArticlesApi.reducer,
});
