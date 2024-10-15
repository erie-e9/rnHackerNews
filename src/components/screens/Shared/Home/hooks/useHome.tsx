import {useCallback, useEffect, useMemo, useState} from 'react';
import {format} from 'date-fns';
import {useGetItemsQuery} from '@hooks/api';
import {Logger, useCopy} from '@services';
import {filterArrayByKeys} from '@utils/functions';
import {ApplicationScreenProps, Article} from '@types';
import {
  useOfflineCache,
  useArticles,
  useArticlesFavorites,
  useBackgroundWorker,
  useToast,
  useAppPreferences,
  useNotifications,
} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {urlValidator} from '@utils/validators';

export const useHome = () => {
  const navigation: ApplicationScreenProps = useNavigation();
  const {checkUrl} = urlValidator();
  const {topic} = useAppPreferences();
  const {getCopyValue} = useCopy();
  const {deletedArticlesItems, removedArticles} = useArticles();
  const {handleFavorite} = useArticlesFavorites();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {data, isLoading, error, refetch} = useGetItemsQuery(topic);
  const {
    data: items,
    loading,
    error: cacheError,
  } = useOfflineCache({
    storageKey: 'articles',
    data: data?.hits,
    isLoading,
    error,
  });

  const articlesData = useMemo(() => {
    let articleList: Article[] = [];
    let highlightedArticle: Article | null = null;

    if (items) {
      const filteredArticles = filterArrayByKeys(items, deletedArticlesItems, [
        'objectID',
      ]);
      highlightedArticle = filteredArticles[0] || null;
      articleList = filteredArticles.slice(1);
    }

    return {
      articles: articleList,
      highlightedArticle,
    };
  }, [items, data, deletedArticlesItems]);

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

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } catch (error) {
      Logger.log('useHome - onRefresh', {error});
    } finally {
      setIsRefreshing(false);
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

  const {isPermissionGranted} = useNotifications({
    backgroundWorkerTask:
      'com.transistorsoft.getArticlesInBackgroundNotifications',
    onFetchData: onRefresh,
    notificationTitle: getCopyValue(
      'common:alerts.notifications.newPosts.title',
      {
        topic,
      },
    ),
    notificationBody: getCopyValue('common:alerts.notifications.newPosts.body'),
  });
  useEffect(() => {
    Logger.log('hasPermission', {isPermissionGranted});
  }, [isPermissionGranted]);

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
    isRefreshing,
    onRefresh,
    todayDate,
    loading,
    cacheError,
    openArticle,
  };
};
