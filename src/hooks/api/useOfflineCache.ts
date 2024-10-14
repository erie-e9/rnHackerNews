import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { reducerTypes } from '@store/reducers';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface UseOfflineCacheOptions<T> {
    storageKey: reducerTypes;
    data?: T;
    isLoading: boolean;
    error?: any;
    refetch: () => void; // Función refetch proporcionada por el hook RTK
}

export const useOfflineCache = <T>({ storageKey, data, isLoading, error, refetch }: UseOfflineCacheOptions<T>) => {
    const [isOffline, setIsOffline] = useState(false);
    const [cachedData, setCachedData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOffline(!state.isConnected);
        });

        // Cargar los datos almacenados al montar el componente
        const loadStoredData = async () => {
            try {
                const storedData = storage.getString(storageKey);
                if (storedData) {
                    setCachedData(JSON.parse(storedData));
                }
                setLoading(false);
            } catch (err) {
                setFetchError('Failed to load cached data');
                setLoading(false);
            }
        };

        loadStoredData();

        return () => {
            unsubscribe();
        };
    }, [storageKey]);

    // Guardar los datos en MMKV cuando hay conexión y se actualizan los datos de la API
    useEffect(() => {
        if (!isOffline && data) {
            storage.set(storageKey, JSON.stringify(data));
            setCachedData(data);
            setFetchError(null);
        } else if (error) {
            setFetchError('Failed to fetch data');
        }

        setLoading(isLoading);
    }, [data, isLoading, error, isOffline, storageKey]);

    return { data: cachedData, loading, error: fetchError, refetch };
};

export default useOfflineCache;
