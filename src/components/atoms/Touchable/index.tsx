import React, {memo} from 'react';
import {testProperties} from '@utils/functions';
import {type TouchableProps} from '@types';
import {StyledTouchable, TappableText} from './styles';

export const Touchable: React.FC<TouchableProps> = ({
  children,
  testID = 'TouchableID',
  component = undefined,
  title = undefined,
  onPress = undefined,
  onPressType = 'onPress',
  minHeight = undefined,
  titleFontSize = undefined,
  style = {},
  disabledColor = undefined,
  accessibilityRole,
  disabled,
  ...props
}) => {
  const Tappable = (component || StyledTouchable) as unknown as React.FC<any>;

  return (
    <Tappable
      {...testProperties(testID || 'animatedButton')}
      style={style}
      minHeight={minHeight}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole={accessibilityRole || 'button'}
      disabledColor={disabledColor || 'primary200'}
      onPress={onPressType === 'onPress' ? onPress : undefined}
      onPressIn={onPressType === 'onPressIn' ? onPress : undefined}
      onPressOut={onPressType === 'onPressOut' ? onPress : undefined}
      onLongPress={onPressType === 'onLongPress' ? onPress : undefined}
      {...props}>
      {title && !children && (
        <TappableText
          type="Subtitle2"
          color={props.disabled ? disabledColor : 'primary500'}
          titleFontSize={titleFontSize}>
          {title}
        </TappableText>
      )}
      {children && !title && children}
    </Tappable>
  );
};

export default memo(Touchable);
