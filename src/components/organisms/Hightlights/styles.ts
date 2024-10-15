import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize, screen_width } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const CardContainer = styled.View`
  height: ${getNormalizedVerticalSize(200)}px;
  width: ${getNormalizedVerticalSize(screen_width - 40)}px;
  align-items: center;
  /* padding: ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(15)}px; */
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(0)}px;
  border-radius: 15px;
  border-bottom-width: ${getNormalizedHorizontalSize(4)}px;
  border-color: ${({ theme }) => theme.tokens.colors.primary400};
  background-color: ${({ theme }) =>
    theme.tokens.colors[theme.isDarkMode ? 'secondary800' : 'secondary950']};
`;

export const Title = styled(Typography)`
`;

export const CommentText = styled(Typography)`
  color: ${({ theme }) =>
    theme.tokens.colors[theme.isDarkMode ? 'tertiary200' : 'secondary600']};
`;

export const MetaInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
`;

export const Author = styled(Typography)`
  color: ${({ theme }) =>
    theme.tokens.colors[theme.isDarkMode ? 'tertiary200' : 'secondary500']};
`;

export const MetaInfoSeparator = styled(Typography)`
  color: ${({ theme }) =>
    theme.tokens.colors[theme.isDarkMode ? 'tertiary200' : 'secondary500']};
`;

export const Time = styled(Typography)`
  color: ${({ theme }) =>
    theme.tokens.colors[theme.isDarkMode ? 'tertiary200' : 'secondary500']};
`;
export interface StyledButtonProps {
  error?: boolean;
  focused?: boolean;
  hasValue?: boolean;
  editable?: boolean;
  styledFocus?: boolean;
  maintainFocus?: boolean;
  touched?: boolean;
  width?: string | number;
}

export const StyledTextContainer = styled(Touchable)`
  border-radius: 15px;
  position: absolute;
  bottom: 20px;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px;
  background-color: #ffffffa4;
`;

export const OpenArticlepButtonsContainer = styled.View`
  position: absolute;
  flex-direction: row;
  right: ${getNormalizedHorizontalSize(5)}px;
  bottom: ${getNormalizedVerticalSize(5)}px;
  opacity: 0.7;
`;

export const OpenFavoriteArticlepButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(40)}px;
  width: ${getNormalizedHorizontalSize(40)}px;
  margin-horizontal: ${getNormalizedHorizontalSize(3)}px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.tokens.colors.primary600};
`;

export const OpenArticlepButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(40)}px;
  width: ${getNormalizedHorizontalSize(40)}px;
  margin-horizontal: ${getNormalizedHorizontalSize(3)}px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.tokens.colors.primary600};
`;