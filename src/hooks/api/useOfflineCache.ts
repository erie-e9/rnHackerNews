import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { reducerTypes } from '@store/reducers';
import { useArticles } from '@hooks'

interface UseOfflineCacheOptions<T> {
    storageKey: reducerTypes;
    data?: T;
    isLoading: boolean;
    error?: any;
}

const useDispatchBySlice = (storageKey: reducerTypes) => {
    const { saveArticles, savedArticlesItems } = useArticles();

    switch (storageKey) {
        case 'articles':
            return {
                setData: (data: any) => saveArticles(data),
                getData: () => savedArticlesItems,
            };
        default:
            throw new Error(`Unknown reducer type: ${storageKey}`);
    }
};

export const useOfflineCache = <T>({ storageKey, data, isLoading, error }: UseOfflineCacheOptions<T>) => {
    const [isOffline, setIsOffline] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const { setData, getData } = useDispatchBySlice(storageKey);

    const cachedData = getData();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOffline(!state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!isOffline && data) {
            setData(data);
            setFetchError(null);
        } else if (error) {
            setFetchError('Failed to fetch data');
        }
        setLoading(isLoading);
    }, [data, isLoading, error, isOffline, setData]);

    return { data: cachedData, loading, error: fetchError };
};

export default useOfflineCache;
