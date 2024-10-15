import styled from 'styled-components/native';
import { screen_height } from '@utils/functions';
import { Typography } from '@components/atoms';

export const ListContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  height: ${screen_height}px;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled(Typography)`
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
