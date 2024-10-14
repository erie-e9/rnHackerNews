import React, {memo, useCallback} from 'react';
import truncate from 'lodash/truncate';
import {AnimatedButton} from '@components/animated';
import {BackButton} from '@components/molecules';
import {
  UrlContainer,
  StyledUrlText,
  WebViewHeaderContainer,
  ActionButtonsContainer,
  ActionButtonContainer,
} from './styles';

interface WebViewHeaderProps {
  url: string;
  onReload?: () => void;
  onClose?: () => void;
}

const WebViewHeader: React.FC<WebViewHeaderProps> = ({
  url,
  onReload = undefined,
  onClose = undefined,
}) => {
  const ishttps = url.includes('https');
  const splittedUrl = url.split(/(?=:\/\/)/g);
  console.log('ewewe', {splittedUrl});

  const menuHandler = useCallback((): void => {
    onReload?.();
  }, []);

  return (
    <WebViewHeaderContainer>
      <ActionButtonsContainer>
        <ActionButtonContainer>
          <BackButton />
        </ActionButtonContainer>
        <UrlContainer>
          <StyledUrlText
            testID="url-text-protocol"
            color={ishttps ? 'success_status' : 'secondary950'}
            type="Body3">
            {splittedUrl[0]}
          </StyledUrlText>
          <StyledUrlText
            testID="url-text-address"
            color={'secondary950'}
            type="Body3">
            {truncate(splittedUrl[1], {
              length: 25,
            })}
          </StyledUrlText>
        </UrlContainer>
        <ActionButtonContainer>
          <AnimatedButton onPress={menuHandler} source="menu" size={80} />
        </ActionButtonContainer>
      </ActionButtonsContainer>
    </WebViewHeaderContainer>
  );
};

export default memo(WebViewHeader);
