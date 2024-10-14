import React, {memo} from 'react';
import {RouteProp} from '@react-navigation/core';
import {type ApplicationStackParamList} from '@types';
import WebViewHeader from './components/WebViewHeader';
import {StyledWebView} from './styles';

export interface WebViewerProps {
  route: RouteProp<ApplicationStackParamList, 'WebViewer'>;
}

export const WebViewer: React.FC<WebViewerProps> = ({route}) => {
  const {url} = route?.params;

  return (
    <>
      <WebViewHeader url={url} />
      <StyledWebView source={{uri: url}} />
    </>
  );
};

export default memo(WebViewer);
