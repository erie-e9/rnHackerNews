import React, {memo, useCallback} from 'react';
// import { useModal } from '@hooks';
import {
  OptionButton,
  OptionButtonContainer,
  OptionsContainer,
  OptionButtonLabel,
} from './styles';

interface WebViewOptionsProps {
  onReload?: () => void;
  onShare?: () => void;
  onOpenBrowser?: () => void;
}

const WebViewOptions: React.FC<WebViewOptionsProps> = ({
  onReload = undefined,
  onShare = undefined,
  onOpenBrowser = undefined,
}) => {
  // const { hideModal } = useModal();

  const closeBottomSheet = useCallback(() => {
    // hideModal();
  }, []);

  const shareHandler = useCallback(() => {
    closeBottomSheet();
    if (onShare) onShare();
  }, []);

  const reloadHandler = useCallback(() => {
    closeBottomSheet();
    if (onReload) onReload();
  }, []);

  const openInBrowserHandler = useCallback(() => {
    closeBottomSheet();
    if (onOpenBrowser) onOpenBrowser();
  }, []);

  return (
    <OptionsContainer>
      <OptionButtonContainer>
        <OptionButton
          type="Icon"
          buttonTheme="Primary"
          onPress={() => shareHandler}
          // icon={<ShareIcon />}
        />
        <OptionButtonLabel textAlign="center" color="secondary950">
          {'common:webviewer.option1'}
        </OptionButtonLabel>
      </OptionButtonContainer>
      <OptionButtonContainer>
        <OptionButton
          type="Icon"
          buttonTheme="Primary"
          onPress={reloadHandler}
          // icon={<ReloadIcon />}
        />
        <OptionButtonLabel textAlign="center" color="secondary950">
          {'common:webviewer.option2'}
        </OptionButtonLabel>
      </OptionButtonContainer>
      <OptionButtonContainer>
        <OptionButton
          type="Icon"
          buttonTheme="Primary"
          onPress={openInBrowserHandler}
          // icon={<BrowserIcon />}
        />
        <OptionButtonLabel textAlign="center" color="secondary950">
          {'common:webviewer.option3'}
        </OptionButtonLabel>
      </OptionButtonContainer>
    </OptionsContainer>
  );
};

export default memo(WebViewOptions);
