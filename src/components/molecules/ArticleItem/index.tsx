import React, {memo, useCallback, useMemo, useRef} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from '@react-navigation/native';
import {formatDistanceToNow} from 'date-fns';
import lodash from 'lodash';
import {ApplicationScreenProps, Article} from '@types';
import {useTheme, useToast} from '@hooks';
import {cleanText} from '@utils/functions';
import {urlValidator} from '@utils/validators';
import Lottie, {LottieViewProps} from '@components/atoms/Lottie';
import {
  Author,
  CommentText,
  DeleteButtonText,
  HeadItemContainer,
  ItemContainer,
  LeftAction,
  MetaInfo,
  MetaInfoSeparator,
  RightAction,
  Time,
  Title,
} from './styles';

type ArticleItemProps = {
  article: Article;
  leftAction?: (articleId: number | string) => void;
  rightAction?: (articleId: number | string) => void;
};

export const ArticleItem: React.FC<ArticleItemProps> = ({
  article,
  leftAction,
  rightAction,
}) => {
  const navigation: ApplicationScreenProps = useNavigation();
  const {Animations, Images} = useTheme();
  const animationRef = useRef<LottieViewProps>(null);
  const {checkUrl} = urlValidator();
  const formattedTime = useMemo(() => {
    return (
      article?.created_at &&
      formatDistanceToNow(new Date(article?.created_at), {
        addSuffix: true,
      })
    );
  }, []);

  const renderRightActions = () => {
    return (
      <RightAction onPress={() => rightAction && rightAction(article.objectID)}>
        <DeleteButtonText>Delete</DeleteButtonText>
      </RightAction>
    );
  };

  const renderLeftActions = () => {
    return (
      <LeftAction onPress={() => leftAction && leftAction(article.objectID)}>
        <Lottie
          ref={animationRef}
          source={Animations.heart2}
          autoPlay={false}
          renderMode="SOFTWARE"
          loop={false}
          resizeMode="cover"
          width={80}
          height={80}
        />
      </LeftAction>
    );
  };

  const openArticle = useCallback(async (): Promise<void> => {
    let url = '';

    if (article.url) {
      url = article.url;
    } else if (article.story_url) {
      url = article.story_url;
    }

    if (url) {
      if (url.endsWith('/') && article.story_id) {
        const concatenatedUrl = `${url}${article.story_id}`;

        const isValidConcatenatedUrl = await checkUrl(concatenatedUrl);
        if (isValidConcatenatedUrl) {
          url = concatenatedUrl;
        }
      }

      await navigation.navigate('Shared', {
        screen: 'WebViewer',
        params: {url},
      } as never);
    } else {
      useToast.info({
        message: 'common:toasts.invalidURL',
        duration: 3000,
      });
    }
  }, [article, navigation]);

  return (
    <Swipeable
      overshootRight={false}
      overshootLeft={false}
      renderRightActions={rightAction && renderRightActions}
      renderLeftActions={leftAction && renderLeftActions}
      // onSwipeableRightOpen={}
    >
      <TouchableOpacity onPress={openArticle}>
        <ItemContainer>
          <HeadItemContainer>
            <Image
              source={Images.icons.icon}
              resizeMode="cover"
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />
            <Title type="Subtitle2">
              {lodash.truncate(article.story_title || article.title || '', {
                length: 80,
                omission: '...',
              })}
            </Title>
          </HeadItemContainer>
          {article?.comment_text && (
            <CommentText>
              {cleanText(
                lodash.truncate(
                  article?.comment_text.replace(/(<([^>]+)>)/gi, ''),
                  {length: 45, omission: '...'},
                ),
              )}
            </CommentText>
          )}
          <MetaInfo>
            <Author type="Subtitle2">
              @
              {lodash.truncate(article.author || '', {
                length: 15,
                omission: '...',
              })}
            </Author>
            <MetaInfoSeparator type="Caption"> - </MetaInfoSeparator>
            <Time type="Caption">{formattedTime}</Time>
          </MetaInfo>
        </ItemContainer>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default memo(ArticleItem);
