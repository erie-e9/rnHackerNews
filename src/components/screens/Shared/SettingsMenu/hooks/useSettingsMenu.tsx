import {useCallback, useMemo} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Logger, useCopy} from '@services';
import {type ApplicationScreenProps, type MenuItemProps} from '@types';
import {useAppAlerts, useAppPreferences, useBackgroundWorker} from '@hooks';
import {Switch} from '@components/molecules';
import * as resources from '@services/translations/resources';
import languagesList from '@assets/shared/languagesList.json';

export const useSettingsMenu = (): {
  listItems: Array<MenuItemProps>;
} => {
  const {getCopyValue} = useCopy();
  const navigation: ApplicationScreenProps = useNavigation();
  const {startFetch, stopFetch} = useBackgroundWorker(
    'com.transistorsoft.getArticlesInBackground',
  );
  const {
    mode,
    language,
    chageSwitchNotifications,
    notifications,
    changeSwitchBackgroundFetch,
    backgroundFetch,
  } = useAppPreferences();

  const currentModeLabel = useMemo(() => {
    if (!mode) {
      return getCopyValue(
        'settings:settings.settings.items.appPreferences.items.changeAppearance.modes.systemMode',
        {
          osDevice: Platform.OS === 'ios' ? 'iOS' : 'Android',
        },
      );
    }
    return `settings:settings.settings.items.appPreferences.items.changeAppearance.modes.${mode}Mode`;
  }, [mode, getCopyValue]);

  const toggleSwitch = useCallback(
    async (value: boolean, type: string) => {
      if (type === 'notifications') {
        chageSwitchNotifications(value);
      } else {
        changeSwitchBackgroundFetch(value);
        if (value) {
          startFetch();
        } else {
          stopFetch();
        }
      }
    },
    [notifications, backgroundFetch],
  );

  const SwitcBackgroundFetch = useMemo(() => {
    return (
      <Switch
        size={23}
        color={'secondary950'}
        name="switch"
        activated={backgroundFetch}
        showIndicators={false}
        onChange={(value: boolean) => toggleSwitch(value, 'backgroundFetch')}
      />
    );
  }, [backgroundFetch, toggleSwitch]);

  const SwitcNotifications = useMemo(() => {
    return (
      <Switch
        size={23}
        color={'secondary950'}
        name="switch"
        activated={notifications}
        showIndicators={false}
        onChange={(value: boolean) => toggleSwitch(value, 'notifications')}
      />
    );
  }, [notifications, toggleSwitch]);

  const listItems = useMemo(() => {
    const accountItems: MenuItemProps['items'] = [
      {
        testID: 'favoritesButton',
        title: 'settings:settings.settings.account.items.favorites.title',
        description:
          'settings:settings.settings.account.items.favorites.description',
        onPress: () =>
          navigation.navigate('Shared', {
            screen: 'Favorites',
          }),
        disabled: false,
      },
      {
        testID: 'deletedItemsButton',
        title: 'settings:settings.settings.account.items.deleted.title',
        description:
          'settings:settings.settings.account.items.deleted.description',
        onPress: () =>
          navigation.navigate('Shared', {
            screen: 'DeletedArticles',
          }),
        disabled: false,
      },
    ];

    const appPreferencesItems: MenuItemProps['items'] = [
      {
        testID: 'notificationsButton',
        title:
          'settings:settings.settings.appPreferences.items.notifications.title',
        description:
          'settings:settings.settings.appPreferences.items.notifications.description',
        rightBody: SwitcNotifications,
        disabled: false,
      },
      {
        testID: 'backgroundFetcherButton',
        title:
          'settings:settings.settings.appPreferences.items.backgroundFetcher.title',
        description:
          'settings:settings.settings.appPreferences.items.backgroundFetcher.description',
        rightBody: SwitcBackgroundFetch,
        leftIcon: 'passwordfingerprint',
        disabled: false,
      },
    ];

    return [
      {
        title: getCopyValue('settings:settings.settings.account.title'),
        items: accountItems,
      },
      {
        title: getCopyValue('settings:settings.settings.appPreferences.title'),
        items: appPreferencesItems,
      },
    ];
  }, [currentModeLabel, language, toggleSwitch]);

  return {
    listItems,
  };
};

export default useSettingsMenu;
