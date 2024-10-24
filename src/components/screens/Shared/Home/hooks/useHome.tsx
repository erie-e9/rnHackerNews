import {useCallback, useEffect, useMemo} from 'react';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import truncate from 'lodash/truncate';
import {Logger, useCopy} from '@services';
import {urlValidator} from '@utils/validators';
import {filterArrayByKeys} from '@utils/functions';
import {ApplicationScreenProps, Article} from '@types';
import {
  useArticles,
  useArticlesFavorites,
  useBackgroundWorker,
  useToast,
  useAppPreferences,
  useNotifications,
} from '@hooks';

export const useHome = () => {
  const navigation: ApplicationScreenProps = useNavigation();
  const {sendNotification} = useNotifications();
  const {checkUrl} = urlValidator();
  const {topic} = useAppPreferences();
  const {
    data,
    isLoading,
    error,
    refetch,
    deletedArticlesItems,
    removedArticles,
  } = useArticles();
  const {handleFavorite} = useArticlesFavorites();

  const articlesData = useMemo(() => {
    let articleList: Article[] = [];
    let highlightedArticle: Article | null = null;

    if (data) {
      const filteredArticles = filterArrayByKeys(data, deletedArticlesItems, [
        'objectID',
      ]);
      highlightedArticle = filteredArticles[0] || null;
      articleList = filteredArticles.slice(1);
    }

    return {
      articles: articleList,
      highlightedArticle,
    };
  }, [data, deletedArticlesItems]);

  const addFavorite = useCallback(
    (article: Article) => {
      handleFavorite(article);
    },
    [handleFavorite],
  );

  const deleteArticles = useCallback(
    (article: Article) => {
      removedArticles(article);
    },
    [removedArticles],
  );

  const sendPushNotification = useCallback(async () => {
    const url: string = data[0]?.url || data[0]?.story_url || '';

    await sendNotification(
      truncate(data[0].story_title || data[0].title, {
        length: 40,
        omission: '...',
      }),
      truncate(data[0].comment_text, {
        length: 50,
        omission: '...',
      }),

      // articlesData?.highlightedArticle?.story_title ||
      //   articlesData?.highlightedArticle?.title ||
      //   '',
      // articlesData?.highlightedArticle?.comment_text || '',
      // 'android',
      'android',
      url,
    );
  }, [data]);

  const onRefresh = useCallback(async () => {
    try {
      Logger.log('onRefresh triggered');

      await refetch();
      await sendPushNotification();
    } catch (error) {
      Logger.log('useHome - onRefresh', {error});
    }
  }, [refetch]);

  // Background worker setup
  const {
    status,
    error: errorFetch,
    startFetch,
  } = useBackgroundWorker(
    'com.transistorsoft.getArticlesInBackground',
    onRefresh,
    {minimumFetchInterval: 15},
  );

  useEffect(() => {
    startFetch();
  }, [status, error, startFetch]);

  const todayDate = useMemo(() => format(new Date(), 'cccc, LLLL do'), []);

  const openArticle = useCallback(
    async (url?: string): Promise<void> => {
      if (url) {
        const isValidUrl = await checkUrl(url);
        if (isValidUrl) {
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
      }
    },
    [navigation],
  );

  return {
    articlesData,
    deleteArticles,
    addFavorite,
    isRefreshing: isLoading,
    onRefresh,
    todayDate,
    loading: isLoading,
    // cacheError,
    openArticle,
  };
};
