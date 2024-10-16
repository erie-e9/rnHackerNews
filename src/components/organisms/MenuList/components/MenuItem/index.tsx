import React, {memo, useCallback} from 'react';
import {type MenuItemProps, type SettingsRenderItemProps} from '@types';
import {MenuButton} from '@components/molecules';
import {
  SettingItemContainer,
  SettingHeadContainer,
  TitleContainer,
  SettingItemTitle,
  StyledList,
} from './styles';

export const MenuItem: React.FC<MenuItemProps> = ({icon, title, items}) => {
  const renderItem = useCallback(({item}: {item: SettingsRenderItemProps}) => {
    return (
      <MenuButton
        title={item.title}
        hasParent={!!title}
        leftIcon={item.leftIcon}
        rightIcon={item.rightIcon}
        description={item.description || undefined}
        onPress={item.onPress}
        selectedOption={item.selectedOption}
        disabled={item.disabled}
        rightBody={item.rightBody}
      />
    );
  }, []);

  return (
    <SettingItemContainer>
      <SettingHeadContainer>
        {title && title !== '' && (
          <TitleContainer leftIcon={Boolean(icon)}>
            <SettingItemTitle type="Subtitle1" color="secondary950">
              {title}
            </SettingItemTitle>
          </TitleContainer>
        )}
      </SettingHeadContainer>
      <StyledList
        data={items}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </SettingItemContainer>
  );
};

export default memo(MenuItem);
