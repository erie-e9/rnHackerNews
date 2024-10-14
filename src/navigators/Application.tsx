import React, {memo, useEffect} from 'react';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import SplashScreen from 'react-native-lottie-splash-screen';
import {DefaultTheme, ThemeProvider} from 'styled-components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {lightMode} from '@theme/themes/light';
import {darkMode} from '@theme/themes/dark';
import {type ApplicationStackParamList} from '@types';
import {useTheme, useToast, useCheckNet} from '@hooks';
import SharedNavigator from '@navigators/Shared';
import {SafeAreaViewProvider, StatusBar} from '@components/atoms';
import {Toast} from '@components/molecules';

const {Navigator, Screen} = createStackNavigator<ApplicationStackParamList>();

const Application = () => {
  const {darkMode: darkModeApp, NavigationTheme} = useTheme();
  const {appConnected} = useCheckNet();
  const gestureHandlerRootViewStyle = {flex: 1};

  const mode = (): DefaultTheme => {
    if (darkModeApp) {
      return darkMode();
    }
    return lightMode();
  };

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (!appConnected.isConnected) {
      useToast.warning({
        message: 'common:messages.noConnection',
      });
    } else {
      useToast.close();
    }
  }, [appConnected.isConnected, appConnected.type]);

  return (
    <ThemeProvider theme={mode}>
      <SafeAreaViewProvider>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <GestureHandlerRootView style={gestureHandlerRootViewStyle}>
            <StatusBar />
            <Navigator
              initialRouteName={'Shared'}
              screenOptions={{
                gestureEnabled: true,
                animationEnabled: true,
                freezeOnBlur: true,
                headerShown: false,
                headerMode: 'screen',
                headerBackTitleVisible: true,
                headerTransparent: true,
                ...TransitionPresets.ScaleFromCenterAndroid,
              }}>
              {/* <Screen key="Startup" name="Startup" component={Startup} /> */}

              <Screen // All accesible screens even if user is authenticated or not, both cases.
                key="Shared"
                name="Shared"
                component={SharedNavigator}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forScaleFromCenterAndroid,
                }}
              />
            </Navigator>
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaViewProvider>
    </ThemeProvider>
  );
};

export default memo(Application);
