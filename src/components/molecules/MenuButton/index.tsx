import React, {memo, useCallback} from 'react';
import {type SettingsRenderItemProps} from '@types';
import {testProperties} from '@utils/functions';
import {
  BodyContainer,
  TouchableAreaContainer,
  ContentContainer,
  HeaderContainer,
  TitleContainer,
  StyledTitleText,
  SubTitleContainer,
  SelectedOptionContainer,
  SelectedOptionText,
  StyledSubTitleText,
  LabelContainer,
  LeftContainer,
  ArrowContainer,
  RightBodyContainer,
  RightContainer,
} from './styles';

const MenuButton: React.FC<SettingsRenderItemProps> = ({
  testID = 'MenuButtonID',
  onPress = undefined,
  title = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  description = undefined,
  selectedOption = undefined,
  disabled,
  rightBody,
  hasParent,
}) => {
  const onPressHandler = useCallback(() => {
    if (onPress) onPress();
  }, []);

  return (
    <BodyContainer {...testProperties(testID)}>
      <TouchableAreaContainer
        onPressType="onPress"
        onPress={onPressHandler}
        disabled={disabled}>
        <ContentContainer>
          <LabelContainer>
            {title && title !== '' && (
              <HeaderContainer>
                <LeftContainer>
                  {title && title !== '' && (
                    <TitleContainer leftIcon={true}>
                      <StyledTitleText
                        type={hasParent ? 'Body3' : 'Subtitle1'}
                        color="secondary950">
                        {title}
                      </StyledTitleText>

                      {description && (
                        <SubTitleContainer>
                          <StyledSubTitleText
                            type="Label"
                            font="Primary"
                            color="secondary700">
                            {description}
                          </StyledSubTitleText>
                        </SubTitleContainer>
                      )}
                    </TitleContainer>
                  )}
                </LeftContainer>
                {(rightBody || rightIcon || selectedOption !== '') && (
                  <RightContainer>
                    {!rightIcon && rightBody && !selectedOption && (
                      <RightBodyContainer>{rightBody}</RightBodyContainer>
                    )}
                    {!rightIcon && !rightBody && selectedOption && (
                      <SelectedOptionContainer>
                        <SelectedOptionText type="Body3" color="secondary950">
                          {selectedOption}
                        </SelectedOptionText>
                      </SelectedOptionContainer>
                    )}
                  </RightContainer>
                )}
              </HeaderContainer>
            )}
          </LabelContainer>
          {/* {rightBody ||
            (rightIcon && (
              <RightContainer>
                {rightIcon && !rightBody && (
                  <ArrowContainer>
                    <SVGIcon icon={rightIcon} />
                  </ArrowContainer>
                )}
                {!rightIcon && rightBody && (
                  <RightBodyContainer>{rightBody}</RightBodyContainer>
                )}
              </RightContainer>
            ))} */}
        </ContentContainer>
      </TouchableAreaContainer>
    </BodyContainer>
  );
};

export default memo(MenuButton);
