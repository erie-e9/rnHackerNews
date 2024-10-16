/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee, { EventType} from '@notifee/react-native';
import App from './src/App';
import {name as appName} from './app.json';

 notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    switch (type) {
        case EventType.PRESS:
            console.log('Notification pressed in background', notification);
            if (pressAction === 'openArticle') {
              // Open webviewer screen passing url
            }
            await notifee.cancelNotification(notification.id);
            break;
        case EventType.DISMISSED:
            console.log('Notification dismissed in background', notification);
            break;
        default:
            break;
    }
});

AppRegistry.registerComponent(appName, () => App);
