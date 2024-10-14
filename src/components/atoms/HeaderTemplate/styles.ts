import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

interface HeaderStyle {
  headerStyle: 'Primary' | 'Secondary';
}

export const HeaderContainer = styled.View<HeaderStyle>`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: ${({ headerStyle }) =>
    getNormalizedVerticalSize(headerStyle === 'Primary' ? 50 : 35)}px;
    padding-bottom: ${getNormalizedVerticalSize(20)}px;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeftCotainer = styled.View<{
  hasHeaderOptions: boolean;
}>`
  flex-direction: row;
  width: ${({ hasHeaderOptions }) => (hasHeaderOptions ? '75%' : '100%')};
  justify-content: flex-start;
`;

export const BackButtonContainer = styled.View<HeaderStyle>`
  height: auto;
  width: ${({ headerStyle }) => (headerStyle === 'Primary' ? 20 : 20)}px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${getNormalizedVerticalSize(4)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const TitleTextContainer = styled.View<HeaderStyle>`
  width: 90%;
  justify-content: center;
  min-height: ${({ headerStyle }) =>
    getNormalizedVerticalSize(
      headerStyle === 'Primary' ? getNormalizedVerticalSize(30) : getNormalizedVerticalSize(30),
    )}px;
  align-items: ${({ headerStyle }) => (headerStyle === 'Primary' ? 'flex-start' : 'center')};
`;

export const TitleText = styled(Typography)``;

export const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 40px;
  height: 100%;
`;

export const DescriptionContainer = styled.View<HeaderStyle>`
  align-self: ${({ headerStyle }) => (headerStyle === 'Primary' ? 'flex-start' : 'center')};
  background-color: transparent;
`;

export const DescriptionText = styled(Typography)``;