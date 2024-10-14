import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage as changeLanguageApp, Logger } from '@services';
import {
  changeMode,
  changeLanguage,
  switchNotifications,
  switchBackgroundFetch,
} from '@slices/shared';
import {
  type AppPreferencesState,
  type Language,
  type Mode,
} from '@slices/types/appPreferences';

export const useAppPreferences = (): {
  switchMode: (modeParam: Mode) => void;
  mode: Mode;
  language: Language;
  switchLanguage: (languageParam: Language) => void;
  chageSwitchNotifications: (notifications: boolean) => void;
  notifications: boolean;
  changeSwitchBackgroundFetch: (backgroundFetch: boolean) => void;
  backgroundFetch: boolean;
} => {
  const dispatch = useDispatch();

  const { mode, language, notifications, backgroundFetch } = useSelector(
    (state: { appPreferences: AppPreferencesState }) => state.appPreferences,
  );

  const switchMode = useCallback((modeParam: Mode): void => {
    try {
      dispatch(changeMode({ mode: modeParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchMode:', { error });
    }
  }, []);

  const switchLanguage = useCallback((languageParam: Language): void => {
    try {
      dispatch(changeLanguage({ language: languageParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchLanguage:', { error });
    } finally {
      changeLanguageApp(languageParam);
    }
  }, []);

  const chageSwitchNotifications = useCallback((notifications: boolean): void => {
    try {
      dispatch(switchNotifications({ notifications }));
    } catch (error) {
      Logger.error('[useAppPreferences] chageSwitchNotifications:', { error });
    }
  }, []);

  const changeSwitchBackgroundFetch = useCallback((backgroundFetch: boolean): void => {
    try {
      dispatch(switchBackgroundFetch({ backgroundFetch }));
    } catch (error) {
      Logger.error('[useAppPreferences] changeSwitchBackgroundFetch:', { error });
    }
  }, []);

  return {
    mode,
    switchMode,
    language,
    switchLanguage,
    chageSwitchNotifications,
    notifications,
    changeSwitchBackgroundFetch,
    backgroundFetch,
  };
};
