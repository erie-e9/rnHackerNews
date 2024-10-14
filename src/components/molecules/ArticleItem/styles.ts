import { Typography } from '@components/atoms';
import styled from 'styled-components/native';
import { getNormalizedHorizontalSize } from '@utils/functions';

export const ItemContainer = styled.View`
  padding: 5px 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.tokens.colors.secondary300};
  background-color: ${({ theme }) => theme.tokens.colors.tertiary50};
`;

export const HeadItemContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.secondary950};
  margin-horizontal: ${getNormalizedHorizontalSize(5)}px;
`;

export const MetaInfoSeparator = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const ActionText = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.secondary700};
`;

export const MetaInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
`;

export const Author = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.primary600};
`;

export const Time = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.secondary800};
`;

export const CommentText = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.secondary600};
`;

export const DeleteButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const RightAction = styled.TouchableOpacity`
  flex: 0.2;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.tokens.colors.danger_status};
`;

export const LeftAction = styled.TouchableOpacity`
  flex: 0.2;
  height: auto;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.tokens.colors.success_status};
`;