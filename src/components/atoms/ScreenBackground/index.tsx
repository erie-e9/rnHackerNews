import React, {memo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {type ScreenBackgroundProps} from '@types';
import {ScreenBackgroundContainer} from './style';

export const ScreenBackground: React.FC<Partial<ScreenBackgroundProps>> = ({
  children,
  style = {...StyleSheet.absoluteFillObject},
}) => {
  const dimensions = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  };

  return (
    <ScreenBackgroundContainer style={[style, dimensions]}>
      {children}
    </ScreenBackgroundContainer>
  );
};

export default memo(ScreenBackground);
