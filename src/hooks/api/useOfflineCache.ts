import { useState, useEffect } from 'react';
import { reducerTypes } from '@store/reducers';
import { useArticles, useCheckNet, useTodos } from '@hooks';
import { Logger } from '@services';

interface UseOfflineCacheOptions<T> {
    storageKey: reducerTypes;
    data?: T;
    isLoading: boolean;
    error?: any;
}

const useDispatchBySlice = (storageKey: reducerTypes) => {
    const { saveArticles, savedArticlesItems } = useArticles();
    const { todos } = useTodos();

    switch (storageKey) {
        case 'articles':
            return {
                setData: (data: any) => saveArticles(data),
                getData: () => savedArticlesItems,
            };
        case 'todos':
            return {
                setData: (data: any) => Logger.log(data),
                getData: () => todos,
            };
        default:
            throw new Error(`Unknown reducer type: ${storageKey}`);
    }
};

export const useOfflineCache = <T>({ storageKey, data, isLoading, error }: UseOfflineCacheOptions<T>) => {
    const { appConnected } = useCheckNet();
    const { isConnected } = appConnected;
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const { setData, getData } = useDispatchBySlice(storageKey);

    const cachedData = getData();

    useEffect(() => {
        if (isConnected && data) {
            setData(data);
            setFetchError(null);
        } else if (error) {
            setFetchError('Failed to fetch data');
        }
        setLoading(isLoading);
    }, [data, isLoading, error, isConnected, setData]);

    return { data: cachedData, loading, error: fetchError };
};

export default useOfflineCache;
