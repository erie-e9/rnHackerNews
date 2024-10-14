import { api } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import {
  appPreferences,
  articles,
  favorites,
  responseHandler,
} from '@slices/shared';

export type reducerTypes = 'appPreferences' | 'articles' | 'favorites' | 'responseHandler';

export const reducers = combineReducers({
  appPreferences,
  articles,
  favorites,
  responseHandler,
  [api.reducerPath]: api.reducer,
});
