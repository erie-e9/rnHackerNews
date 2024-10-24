/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import { Logger } from '@services';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['[Reanimated] Reading from']);

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    switch (type) {
        case EventType.ACTION_PRESS:
            if (pressAction?.id === 'default') {
                Logger.log('Notification pressed in background', {notification, pressAction, detail, android: notification.android, data: notification.data});
              // Open webviewer screen passing url 
              await notifee.cancelNotification(notification?.id);
            }
            break;
        case EventType.DISMISSED:
            Logger.log('Notification dismissed in background', notification);
            break;
        default:
            break;
    }
});

AppRegistry.registerComponent(appName, () => App);
