import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

interface CheckNetProps {
  appConnected: Partial<NetInfoState>;
}

export const useCheckNet = (): CheckNetProps => {
  const [appConnected, setAppConnected] = useState<Partial<NetInfoState>>({
    isConnected: true,
    isInternetReachable: true,
    type: NetInfoStateType.wifi,
  });

  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setAppConnected(state);
    };

    checkConnection();
    const subscription = NetInfo.addEventListener((state) => {
      setAppConnected(state);
    });

    return () => {
      subscription && subscription();
    };
  }, []);

  return { appConnected: appConnected as Partial<NetInfoState> };
};
