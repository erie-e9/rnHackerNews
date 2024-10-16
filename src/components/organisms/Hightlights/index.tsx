import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {Image} from 'react-native';
import LottieView from 'lottie-react-native';
import lodash from 'lodash';
import {formatDistanceToNow} from 'date-fns';
import {type Article} from '@types';
import {useTheme} from '@hooks';
import {AnimatedButton, TransformAnimation} from '@components/animated';
import {
  Title,
  CommentText,
  CardContainer,
  StyledTextContainer,
  MetaInfo,
  Author,
  MetaInfoSeparator,
  Time,
  OpenArticlepButtonContainer,
  OpenArticlepButtonsContainer,
  OpenFavoriteArticlepButtonContainer,
} from './styles';

export interface HightlightsProps {
  article: Article;
  leftAction?: (article: Article) => void;
  rightAction?: (article: Article) => void;
  onTouch?: (url: string) => void;
}

const Hightlights: React.FC<HightlightsProps> = ({
  article,
  leftAction,
  onTouch,
}) => {
  const {Images} = useTheme();
  const animationRef = useRef<LottieView>(null);

  const formattedTime = useMemo(() => {
    return (
      article?.created_at &&
      formatDistanceToNow(new Date(article?.created_at), {
        addSuffix: true,
      })
    );
  }, [article]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const navigationHandler = useCallback((): void => {
    let url = '';

    if (article.url) {
      url = article.url;
    } else if (article.story_url) {
      url = article.story_url;
    }

    if (url && onTouch) {
      if (url.endsWith('/') && article.story_id) {
        url = `${url}${article.story_id}`;
      }
      onTouch(url);
    }
  }, []);

  return (
    <Fragment>
      <TransformAnimation
        duration={900}
        initialYValue={0}
        finalYValue={8}
        repeat={0}
        reverse
        easing="linear">
        <CardContainer>
          <Image
            source={Images.wallpapers.doddle}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
          />
          <StyledTextContainer onPress={() => navigationHandler()}>
            <Title
              type="Headline3"
              weight="bold"
              textAlign="left"
              color="primary500">
              {lodash.truncate(article.story_title || article.title || '', {
                length: 24,
                omission: '...',
              })}
            </Title>
            <CommentText type="Subtitle3" weight={600}>
              {lodash.truncate(
                (article?.comment_text || '').replace(/(<([^>]+)>)/gi, ''),
                {
                  length: 80,
                  omission: '...',
                },
              )}
            </CommentText>
            <MetaInfo>
              <Author type="Subtitle3" weight={'bold'}>
                @
                {lodash.truncate(article.author || '', {
                  length: 12,
                  omission: '...',
                })}
              </Author>
              <MetaInfoSeparator type="Caption"> - </MetaInfoSeparator>
              <Time type="Caption">{formattedTime}</Time>
            </MetaInfo>
          </StyledTextContainer>
          <OpenArticlepButtonsContainer>
            <OpenFavoriteArticlepButtonContainer>
              <AnimatedButton
                testID="HightLightsAnimatedButton"
                source="delete"
                size={25}
                onPress={leftAction ? () => leftAction(article) : undefined}
              />
            </OpenFavoriteArticlepButtonContainer>
            <OpenArticlepButtonContainer>
              <AnimatedButton
                testID="HightLightsAnimatedButton"
                source="heart2"
                size={120}
                onPress={leftAction ? () => leftAction(article) : undefined}
              />
            </OpenArticlepButtonContainer>
          </OpenArticlepButtonsContainer>
        </CardContainer>
      </TransformAnimation>
    </Fragment>
  );
};

export default memo(Hightlights);
