import { createSlice } from '@reduxjs/toolkit';
import { type AppPreferencesState, type AppPreferencesPayload } from '@slices/types/appPreferences';

const initialState: Partial<AppPreferencesState> = {
  mode: null,
  language: null,
  notifications: false,
  backgroundFetch: false,
  topic: 'mobile'
};

const appPreferencesSlice = createSlice({
  name: 'appPreferences',
  initialState,
  reducers: {
    changeMode: (state, { payload: { mode } }: AppPreferencesPayload) => {
      state.mode = mode;
    },
    changeLanguage: (state, { payload: { language } }) => {
      state.language = language;
    },
    switchNotifications: (state, { payload: { notifications } }) => {
      state.notifications = notifications;
    },
    switchBackgroundFetch: (state, { payload: { backgroundFetch } }) => {
      state.backgroundFetch = backgroundFetch;
    },
    changeTopic: (state, { payload: { topic } }) => {
      state.topic = topic;
    }
  },
});

export const { changeMode, changeLanguage, switchNotifications, switchBackgroundFetch, changeTopic } =
  appPreferencesSlice.actions;

export default appPreferencesSlice.reducer;
