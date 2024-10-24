import { useCallback, useEffect, useState, } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import notifee, {
    AndroidImportance,
    EventType,
    NotificationSettings,
    AuthorizationStatus,
} from '@notifee/react-native';
import { Logger } from '@services';
import { useAppPreferences } from '@hooks';
import { ApplicationScreenProps } from '@types';


export const useNotifications = () => {
    const { notifications, chageSwitchNotifications } = useAppPreferences();
    const [channels, setChannels] = useState<any[]>([]);
    const navigation: ApplicationScreenProps = useNavigation()
    const [globalNotificationsEnabled, setGlobalNotificationsEnabled] = useState(true);

    const requestPermissions = useCallback(async (): Promise<boolean> => {
        if (Platform.OS === 'ios') {
            const settings: NotificationSettings = await notifee.requestPermission({
                sound: true,
                announcement: true,
            });

            chageSwitchNotifications(Boolean(
                settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
                settings.authorizationStatus === AuthorizationStatus.PROVISIONAL)); // 0 unauthorized 1 authorized
            return Boolean(
                settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
                settings.authorizationStatus === AuthorizationStatus.PROVISIONAL,
            );
        }

        const settings =
            Platform.OS === 'android' && Platform.Version >= 33
                ? await notifee.requestPermission()
                : await notifee.getNotificationSettings();

        const channel = await notifee.getChannel('android');

        chageSwitchNotifications(Boolean(settings.authorizationStatus === AuthorizationStatus.AUTHORIZED &&
            !channel?.blocked)); // 0 unauthorized 1 authorized
        return (
            settings.authorizationStatus === AuthorizationStatus.AUTHORIZED &&
            !channel?.blocked);
    }, []);

    const checkPermissions = useCallback(async () => {
        if (Platform.OS === 'ios') {
            const settings = await notifee.requestPermission({
                sound: true,
                announcement: true,
            });

            chageSwitchNotifications(Boolean(
                settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
                settings.authorizationStatus === AuthorizationStatus.PROVISIONAL)); // 0 unauthorized 1 authorized
            return Boolean(
                settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
                settings.authorizationStatus === AuthorizationStatus.PROVISIONAL,
            );
        }

        const settings =
            Platform.OS === 'android' && Platform.Version >= 33
                ? await notifee.requestPermission()
                : await notifee.getNotificationSettings();

        const channel = await notifee.getChannel('android');

        chageSwitchNotifications(Boolean(settings.authorizationStatus === AuthorizationStatus.AUTHORIZED &&
            !channel?.blocked)); // 0 unauthorized 1 authorized
        return (
            settings.authorizationStatus === AuthorizationStatus.AUTHORIZED &&
            !channel?.blocked);
    }, []);

    // Create a group
    const createChannelGroup = useCallback(async (id: string, name: string) => {
        await notifee.createChannelGroup({
            id,
            name,
        });
    }, []);

    // Crear un canal para notificaciones en Android
    const createChannel = useCallback(async (id: string, name: string,
        lights: boolean,
        vibration: boolean, androidImportance: AndroidImportance, groupChannelId?: string) => {
        await notifee.createChannel({
            id,
            name,
            lights,
            vibration,
            importance: androidImportance || AndroidImportance.HIGH,
            // groupId: groupChannelId
        });

        const newChannels = await notifee.getChannels();
        setChannels(newChannels);
    }, []);

    // Eliminar un canal en Android
    const deleteChannel = useCallback(async (id: string) => {
        await notifee.deleteChannel(id);
        const updatedChannels = await notifee.getChannels();
        setChannels(updatedChannels);
    }, []);

    // Deshabilitar notificaciones globalmente
    const disableGlobalNotifications = useCallback(async () => {
        await notifee.cancelAllNotifications();
        setGlobalNotificationsEnabled(false);
    }, []);

    // Enviar notificación
    const sendNotification = useCallback(async (title: string, body: string, channelId: string, url: string, androidimportance?: AndroidImportance) => {
        Logger.log('sendNotification', { title, body, url });

        await requestPermissions();
        await notifee.displayNotification({
            title,
            body,
            data: { url },
            android: {
                channelId,
                importance: androidimportance || AndroidImportance.HIGH,
                actions: [
                    {
                        pressAction: { id: 'default' },
                        title: 'See article'
                    }
                ]
            },
        });
    }, []);

    // Cancelar todas las notificaciones
    const cancelAllNotifications = async () => {
        await notifee.cancelAllNotifications();
    };


    const unsubscribeForeground = useCallback(() => {
        notifee.onForegroundEvent(({ type, detail }) => {
            const { notification, pressAction } = detail;
            Logger.log('[onForegroundEvent] - Notification', { pressAction, notification, data: notification?.data });
            switch (type) {
                case EventType.PRESS:
                    Logger.log('[onForegroundEvent] - Notification PRESSED', { pressAction, notification, data: notification?.data });
                    if (detail.pressAction?.id === 'default') {
                        Logger.log('open an article');
                        navigation.navigate('Shared', {
                            screen: 'WebViewer',
                            params: { url: notification?.data?.url },
                        } as never);
                    }
                    break;
                case EventType.DISMISSED:
                    Logger.log('[onForegroundEvent] - Notification dismissed', detail.notification);
                    break;
                case EventType.CHANNEL_BLOCKED:
                    Logger.log('[onForegroundEvent] - User toggled channel block', detail?.channel?.id, detail.blocked);
                    break;
                default:
                    break;
            }
        });
    }, []);

    // Manejar eventos de notificación (presionar, descartar, etc.)
    useEffect(() => {

        return () => {
            unsubscribeForeground();
        };
    }, []);

    const createDefaultChannels = useCallback(async () => {
        await createChannel('androidNews', 'New Android Articles', true, true, 4, 'preferences')
        // await createChannel('ios', 'New iOS Articles', true, true, 4, 'preferences')
        // await createChannel('mobile', 'New Mobile Articles', true, true, 4, 'preferences')
        // await notifee.createChannel({
        //     id: 'alarm',
        //     name: 'Firing alarms & timers',
        //     lights: false,
        //     vibration: true,
        //     importance: AndroidImportance.DEFAULT,
        // });
    }, []);

    const createDefaultChannelGroup = useCallback(async () => {
        await createChannelGroup('preferences', 'Preferences')
        await createDefaultChannels();
    }, []);

    const openPermissionSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openSettings();
        } else {
            await notifee.openNotificationSettings();
        }
    };

    useEffect(() => {
        const fetchChannels = async () => {
            const existingChannels = await notifee.getChannels();
            setChannels(existingChannels);
        };

        const permissionsHandler = async () => {
            const hasPermissions = await checkPermissions();
            if (!hasPermissions) {
                Alert.alert(
                    'Enable Notifications',
                    'To receive notifications opt in from your Settings.',
                    [{ text: 'Cancel' }, { text: 'Settings', onPress: openPermissionSettings }],
                );

            }
        }
        // deleteChannel('android')
        // deleteChannel('ios')
        // deleteChannel('mobile')
        createDefaultChannelGroup();
        permissionsHandler();
        fetchChannels();
    }, []);

    return {
        permissions: notifications,
        channels,
        globalNotificationsEnabled,
        requestPermissions,
        createChannelGroup,
        createChannel,
        deleteChannel,
        disableGlobalNotifications,
        sendNotification,
        cancelAllNotifications,
    };
};
