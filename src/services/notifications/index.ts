import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

export const requestPushNotificationPermission = () => {
    PushNotification.configure({
        onRegister: (token) => {
            console.log('Push Notification Token:', token);
        },
        onNotification: (notification) => {
            console.log('Notification received:', notification);
        },
        requestPermissions: Platform.OS === 'ios',
    });
};
