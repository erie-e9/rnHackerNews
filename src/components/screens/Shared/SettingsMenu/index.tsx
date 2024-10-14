import React, {memo} from 'react';
import {useSettingsMenu} from './hooks/useSettingsMenu';
import {MenuList} from '@components/organisms';
import {ListTemplate} from '@components/templates';
import {BodyContainer} from './styles';

export const SettingsMenu: React.FC = () => {
  const useSettingsMenuHook = useSettingsMenu();

  return (
    <ListTemplate
      testID="SettingsMenuID"
      title={'settings:settings.screenTitle'}
      description={'settings:settings.description'}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <MenuList listItems={useSettingsMenuHook.listItems} />
        </BodyContainer>
      }
    />
  );
};

export default memo(SettingsMenu);
