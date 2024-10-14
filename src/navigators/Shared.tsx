import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {type ApplicationStackParamList} from '@types';
import {
  Home,
  Favorites,
  DeletedArticles,
  SettingsMenu,
  WebViewer,
} from '@components/screens/Shared';

export type SharedParamsList = {
  Home: undefined;
  Favorites: undefined;
  DeletedArticles: undefined;
  SettingsMenu: undefined;
  WebViewer: {
    url: string;
    onReload?: () => void;
    onClose?: () => void;
  };
};

const {Navigator, Screen} = createStackNavigator<ApplicationStackParamList>();

export const SharedNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        animationEnabled: true,
        freezeOnBlur: true,
        headerShown: false,
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTransparent: true,
      }}>
      <Screen key="Home" name="Home" component={Home} />
      <Screen key="Favorites" name="Favorites" component={Favorites} />
      <Screen
        key="DeletedArticles"
        name="DeletedArticles"
        component={DeletedArticles}
      />
      <Screen key="SettingsMenu" name="SettingsMenu" component={SettingsMenu} />
      <Screen key="WebViewer" name="WebViewer" component={WebViewer} />
    </Navigator>
  );
};

export default memo(SharedNavigator);
