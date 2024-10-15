import {useCallback, useMemo} from 'react';
import {Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCopy} from '@services';
import {type ApplicationScreenProps, type MenuItemProps} from '@types';
import {useAppPreferences, useBackgroundWorker} from '@hooks';
import {Switch} from '@components/molecules';
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
    switchLanguage,
    language,
    chageSwitchNotifications,
    notifications,
    changeSwitchBackgroundFetch,
    backgroundFetch,
    switchTopic,
    topic,
  } = useAppPreferences();

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

  const changeTopic = useCallback(() => {
    Alert.alert(
      'Change tpoic news',
      'Update the the topic of the news app shows you',
      [
        {text: 'Android', onPress: () => switchTopic('android')},
        {text: 'iOS', onPress: () => switchTopic('ios')},
        {text: 'Mobile', onPress: () => switchTopic('mobile')},
      ],
    );
  }, []);

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

  const showLanguageModal = useCallback(() => {
    const alertTitle = getCopyValue(
      'settings:settings.settings.appPreferences.items.changeLanguage.description',
    );
    Alert.alert(alertTitle, '', [
      {
        text: 'English',
        onPress: () => switchLanguage('en'),
      },
      {
        text: 'Spanish',
        onPress: () => switchLanguage('es'),
      },
    ]);
  }, []);

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
        testID: 'topicSelectorButton',
        title:
          'settings:settings.settings.appPreferences.items.topicSelector.title',
        description:
          'settings:settings.settings.appPreferences.items.topicSelector.description',
        onPress: () => changeTopic(),
        selectedOption: topic,
        disabled: false,
      },
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
      {
        testID: 'preferencesChangeLanguageButton',
        title:
          'settings:settings.settings.appPreferences.items.changeLanguage.title',
        description:
          'settings:settings.settings.appPreferences.items.changeLanguage.description',
        selectedOption: `${
          language !== null
            ? languagesList[language].nativeName
            : getCopyValue(
                'settings:settings.settings.appPreferences.items.changeLanguage.languages.fromPhoneDevice',
                {
                  osDevice: Platform.OS === 'ios' ? 'iOS' : 'Android',
                },
              )
        }`,
        onPress: showLanguageModal,
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
  }, [language, toggleSwitch, topic]);

  return {
    listItems,
  };
};

export default useSettingsMenu;
