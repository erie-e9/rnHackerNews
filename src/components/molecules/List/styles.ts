import { StyleSheet, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export const StyledList = styled(Animated.FlatList)`
  width: 100%;
`;

// export const StyledList = styled(FlashList)`
// `;

export const ListContainer = styled.View<{
  alignItems?: ViewStyle['alignItems'];
}>`
  flex: 1;
  /* height: 100%; */
  align-items: ${({ alignItems }) => (alignItems && alignItems) || 'center'};
  justify-content: center;
  width: 100%;
`;

export const AnimatedItemContainer = styled(Animated.View)`
  flex-direction: row;
  height: auto;
  width: auto;
  position: absolute;
  justify-content: space-between;
  align-items: center;
`;

export const StyledText = styled(Typography)``;

export const LoaderContainer = styled.View<{
  height: number;
}>`
  height: ${({ height }) => getNormalizedVerticalSize(height)}px;
  align-items: center;
  position: absolute;
  width: 100%;
`;

export const Container = styled.View`
  width: 100%;
`;

export const ChildrenContainer = styled.View`
  width: 90%;
`;

export const ScrollToTopContainer = styled.View`
  height: ${getNormalizedVerticalSize(40)}px;
  width: ${getNormalizedHorizontalSize(40)}px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${getNormalizedHorizontalSize(20)}px;
  bottom: ${getNormalizedVerticalSize(10)}px;
  transform: rotate(90deg);
`;

export const ScrollToTopButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(40)}px;
  width: ${getNormalizedHorizontalSize(40)}px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const styles = StyleSheet.create({
  draggerContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    minWidth: '60%',
    // height: 'auto',
    marginHorizontal: 20,
  },
});
