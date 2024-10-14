import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Logger, useCopy} from '@services';
import {type ApplicationScreenProps} from '@types';

export const useAppAlerts = (): {
  showBlockedPermissionAlert: (callback?: () => void) => void;
  showDeniedPermissionAlert: (callback?: () => void) => void;
} => {
  const {getCopyValue} = useCopy();
  const navigation: ApplicationScreenProps = useNavigation();

  const showBlockedPermissionAlert = useCallback((callback?: () => void) => {
    // showModal({
    //   type: 'alert',
    //   title: 'common:alerts.permissions.blocked.title',
    //   showCancelIcon: true,
    //   description: 'common:alerts.permissions.blocked.description',
    //   options: [
    //     {
    //       text: 'common:alerts.permissions.blocked.buttons.buttonOne',
    //       handler: callback && callback,
    //     },
    //   ],
    // });
  }, []);

  const showDeniedPermissionAlert = useCallback((callback?: () => void) => {
    // showModal({
    //   type: 'alert',
    //   title: 'common:alerts.permissions.denied.title',
    //   showCancelIcon: true,
    //   description: getCopyValue('common:alerts.permissions.denied.description', {
    //     deviceName: Platform.OS === 'ios' ? 'iPhone' : 'Android',
    //   }),
    //   options: [
    //     {
    //       text: 'common:alerts.permissions.denied.buttons.buttonOne',
    //       handler: callback && callback,
    //     },
    //   ],
    // });
  }, []);

  return {
    showBlockedPermissionAlert,
    showDeniedPermissionAlert,
  };
};
