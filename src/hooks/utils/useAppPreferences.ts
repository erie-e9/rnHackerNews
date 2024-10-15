import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage as changeLanguageApp, Logger } from '@services';
import {
  changeMode,
  changeLanguage,
  switchNotifications,
  switchBackgroundFetch,
  changeTopic,
} from '@slices/shared';
import {
  type Topic,
  type AppPreferencesState,
  type Language,
  type Mode,
} from '@slices/types/appPreferences';

export const useAppPreferences = (): {
  switchMode: (mode: Mode) => void;
  mode: Mode;
  language: Language;
  switchLanguage: (language: Language) => void;
  chageSwitchNotifications: (notifications: boolean) => void;
  notifications: boolean;
  changeSwitchBackgroundFetch: (backgroundFetch: boolean) => void;
  backgroundFetch: boolean;
  switchTopic: (topic: Topic) => void;
  topic: Topic;
} => {
  const dispatch = useDispatch();

  const { mode, language, notifications, backgroundFetch, topic } = useSelector(
    (state: { appPreferences: AppPreferencesState }) => state.appPreferences,
  );

  const switchMode = useCallback((mode: Mode): void => {
    try {
      dispatch(changeMode({ mode }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchMode:', { error });
    }
  }, []);


  const switchLanguage = useCallback((language: Language): void => {
    try {
      dispatch(changeLanguage({ language }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchLanguage:', { error });
    } finally {
      changeLanguageApp(language);
    }
  }, []);

  const switchTopic = useCallback((topic: Topic): void => {
    try {
      dispatch(changeTopic({ topic }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchMode:', { error });
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
    switchTopic,
    topic,
  };
};
