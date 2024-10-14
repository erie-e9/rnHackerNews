import React, {memo} from 'react';
import {DefaultTheme} from 'styled-components';
import {testProperties} from '@utils/functions';
import {type TouchableProps} from '@types';
import {HeaderTemplate, ScreenBackground} from '@components/atoms';
import {
  StyledContainer,
  StyledKeyboardAvoidingView,
  BodyContainer,
} from './styles';

interface ListTemplatenProps {
  testID?: string;
  title?: string;
  description?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  body?: JSX.Element;
  webviewer?: JSX.Element;
  bodyTestID?: string;
  primaryButton?: TouchableProps;
  secondaryButton?: TouchableProps;
  tertiaryButton?: TouchableProps;
  arrayInlineButtons?: Array<TouchableProps>;
  arrayInlineButtonsFooterText?: JSX.Element | string;
  footer?: JSX.Element;
  backButton?: boolean;
  pressTitle?: 'back' | 'scrollUp';
  headerStyle?: 'Primary' | 'Secondary';
  headerOptions?: React.ReactNode;
  initialColor?: keyof DefaultTheme['tokens']['colors'];
  finalColor?: keyof DefaultTheme['tokens']['colors'];
}

const ListTemplate: React.FC<ListTemplatenProps> = ({
  testID = 'ListTemplateID',
  title,
  description,
  adjustsFontTitle = false,
  numberOfLinesTitle = 1,
  body,
  webviewer,
  bodyTestID,
  backButton = false,
  pressTitle,
  headerStyle = 'Primary',
  headerOptions,
}) => {
  return (
    <ScreenBackground testID={testID}>
      <StyledContainer {...testProperties(testID)}>
        <HeaderTemplate
          title={title || ' '}
          description={description}
          adjustsFontTitle={adjustsFontTitle}
          numberOfLinesTitle={numberOfLinesTitle}
          backButton={backButton}
          pressTitle={pressTitle}
          headerStyle={headerStyle}
          headerOptions={headerOptions}
        />
        {!webviewer && body && (
          <StyledKeyboardAvoidingView>
            <BodyContainer testID={bodyTestID}>{body}</BodyContainer>
          </StyledKeyboardAvoidingView>
        )}
        {!body && webviewer && webviewer}
      </StyledContainer>
    </ScreenBackground>
  );
};

export default memo(ListTemplate);
