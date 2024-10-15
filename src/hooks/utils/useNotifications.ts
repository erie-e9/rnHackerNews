import { useState, useEffect, useCallback } from 'react';
import notifee, { AuthorizationStatus, AndroidImportance } from '@notifee/react-native';
import { Alert, Platform } from 'react-native';
import { useBackgroundWorker } from '@hooks'; // Import your existing BackgroundFetch hook
import { Logger } from '@services'; // Assuming you already have a Logger service in your project

interface UseLocalNotificationsProps {
    backgroundWorkerTask?: string;
    onFetchData?: () => Promise<void>;
    onNotificationDisplay?: (title: string, message: string) => void;
    backgroundFetchInterval?: number;
    notificationTitle?: string;
    notificationBody?: string;
}

export const useNotifications = ({
    backgroundWorkerTask,
    onFetchData,
    onNotificationDisplay,
    backgroundFetchInterval = 15,
    notificationTitle = 'New Notification',
    notificationBody = 'You got a new notification.',
}: UseLocalNotificationsProps) => {
    const [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

    // Check if notification permissions are granted
    const checkPermission = useCallback(async () => {
        const settings = await notifee.getNotificationSettings();

        if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
            // If permissions are denied, request them again
            requestPermission();
        } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
            setIsPermissionGranted(true);
        } else {
            setIsPermissionGranted(false);
        }
    }, []);

    // Request notification permission from the user
    const requestPermission = useCallback(async () => {
        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            setIsPermissionGranted(true);
        } else {
            setIsPermissionGranted(false);
            Alert.alert('Permission Denied', 'Notification permissions are denied. Please enable them in your device settings.');
        }
    }, []);

    // BackgroundFetch hook for executing tasks in the background
    const { status, error, startFetch, stopFetch } = useBackgroundWorker(backgroundWorkerTask || '', async () => {
        // Logic to send notifications in the background
        if (notificationsEnabled && isPermissionGranted) {
            Logger.log('Sending background notification...');
            await onFetchData?.();
            await notifee.displayNotification({
                title: notificationTitle,
                body: notificationBody,
                android: {
                    channelId: 'default',
                    importance: AndroidImportance.HIGH,
                },
            });
        }
    }, { minimumFetchInterval: backgroundFetchInterval });

    // Check if notifications are enabled in device settings
    const checkNotificationsEnabled = useCallback(async () => {
        const settings = await notifee.getNotificationSettings();
        if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
            Alert.alert('Notifications Disabled', 'Notifications are disabled in the device settings.');
            setNotificationsEnabled(false);
        } else {
            setNotificationsEnabled(true);
        }
    }, []);

    // Create notification channel for Android
    const createNotificationChannel = useCallback(async () => {
        if (Platform.OS === 'android') {
            await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH, // Ensures notifications are shown immediately
                vibration: true,
            });
        }
    }, []);

    useEffect(() => {
        createNotificationChannel(); // Ensure the notification channel is created on mount
        checkPermission(); // Check permissions on mount
        checkNotificationsEnabled(); // Check if notifications are enabled in settings
    }, [checkPermission, checkNotificationsEnabled, createNotificationChannel]);

    // Start background fetch when permissions are granted and notifications are enabled
    useEffect(() => {
        if (isPermissionGranted && notificationsEnabled) {
            startFetch();
        } else {
            stopFetch();
        }
    }, [isPermissionGranted, notificationsEnabled, startFetch, stopFetch]);

    return { isPermissionGranted, requestPermission, status, error };
};
