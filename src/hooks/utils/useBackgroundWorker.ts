import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import BackgroundFetch, { BackgroundFetchConfig } from 'react-native-background-fetch';
import { format } from 'date-fns';
import { Logger } from '@services';

type FetchStatus = 'active' | 'inactive' | 'timeout';

export const useBackgroundWorker = (taskId: string, taskFn?: () => Promise<void>, config?: BackgroundFetchConfig) => {
    const [status, setStatus] = useState<FetchStatus>('inactive');
    const [error, setError] = useState<string | null>(null);
    const timestamp = format(new Date(), 'MM/dd/yyyy - kk:mm:t');

    const configureFetch = useCallback(() => {

        try {
            BackgroundFetch.configure(
                {
                    // Android & iOS
                    requiredNetworkType: config?.requiredNetworkType || BackgroundFetch.NETWORK_TYPE_NONE,
                    minimumFetchInterval: config?.minimumFetchInterval || 15,

                    // Only Android 
                    stopOnTerminate: false, // Set false in order to continue background work even after user terminates the app.
                    startOnBoot: true, // Continue background work when device is rebooted.
                    enableHeadless: true, // Set true in order to use React Native's Headless JS feature for continuing background work after app termination.
                    requiresDeviceIdle: false, // Trigger task only if device is active
                    forceAlarmManager: false,// By default, RNBF uses Android's JobScheduler. Setting forceAlarmManager: true will bypass JobScheduler to use Android's AlarmManager.
                    requiresBatteryNotLow: false, // Setting requiresStorageNotLow: true will cause the background worker to ONLY run when storage is NOT low. "Low" is considered to be at the point that a user is given a "low storage" warning.
                    requiresCharging: false, // Set true in order to require that the device be connected to a charger for the module to do background work.
                },
                async () => {
                    setStatus('active');
                    Logger.log(`[BackgroundFetch] Task: ${taskId} is being executed - ${timestamp}`);

                    try {
                        // Trigger background task
                        if (taskFn) await taskFn();
                        BackgroundFetch.finish(taskId); // Task finished successfully.
                        Logger.log(`[BackgroundFetch] Task ${taskId} finished successfuly - ${timestamp}`);
                    } catch (err: any) {
                        setError(err.message);
                        BackgroundFetch.finish(taskId); // Task finished if there's an error.
                        Logger.error(`[BackgroundFetch] Task ${taskId} failed - ${timestamp}`);
                    } finally {
                        setStatus('inactive');
                    }
                },
                (timeoutId) => {
                    // Timeout callback 
                    setStatus('timeout');
                    Logger.warn(`[BackgroundFetch] Task ${timeoutId} timeout - ${timestamp}`);
                    BackgroundFetch.finish(timeoutId);
                }
            );

            // Background status
            BackgroundFetch.status((status) => {
                switch (status) {
                    case BackgroundFetch.STATUS_RESTRICTED:
                        Logger.log('Background fetch is restricted.');
                        Alert.alert('Background Fetch', 'Background fetch is restricted on this device.');
                        break;
                    case BackgroundFetch.STATUS_DENIED:
                        Logger.log('Background fetch is denied.');
                        Alert.alert('Background Fetch', 'Background fetch is denied on this device.');
                        break;
                    case BackgroundFetch.STATUS_AVAILABLE:
                        Logger.log('Background fetch is enabled and available.');
                        break;
                }
            });
        } catch (err: any) {
            Logger.error('Background fetch configuration failed:', err);
            setError(err?.message);
        }
    }, [taskFn, config?.minimumFetchInterval]);

    const startFetch = useCallback(() => {
        BackgroundFetch.start().then(() => {
            Logger.log(`BackgroundFetch has been started - ${timestamp}`);
        });
    }, []);

    const stopFetch = useCallback(() => {
        /* Stop method stop all background task,
            but if a taskId is passed only will pass that periodic task
        */

        BackgroundFetch.stop(taskId).then(() => {
            Logger.log(`BackgroundFetch has been stopped - ${timestamp}`);
        });
    }, []);

    useEffect(() => {
        configureFetch();
        // Cleanup
        return () => {
            stopFetch();
        };
    }, [configureFetch, stopFetch]);

    return { status, error, startFetch, stopFetch };
};
