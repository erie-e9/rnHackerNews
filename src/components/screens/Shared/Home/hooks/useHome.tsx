import {useCallback, useEffect, useMemo, useState} from 'react';
import {format} from 'date-fns';
import {useGetItemsQuery} from '@hooks/api';
import {Logger} from '@services';
import {filterArrayByKeys} from '@utils/functions';
import {ApplicationScreenProps, Article} from '@types';
import {
  useOfflineCache,
  useArticles,
  useArticlesFavorites,
  useBackgroundWorker,
  useToast,
} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {urlValidator} from '@utils/validators';

export const useHome = () => {
  const navigation: ApplicationScreenProps = useNavigation();
  const {checkUrl} = urlValidator();
  const {deletedArticlesItems, removedArticles} = useArticles();
  const {handleFavorite, favoriteArticles} = useArticlesFavorites();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {data, isLoading, error, refetch} = useGetItemsQuery('books');
  const {
    data: items,
    loading,
    error: cacheError,
    refetch: cacheRefetch,
  } = useOfflineCache({
    storageKey: 'articles',
    data,
    isLoading,
    error,
    refetch,
  });

  const articlesData = useMemo(() => {
    let articleList: Article[] = [];
    let highlightedArticle: Article | null = null;

    if (items?.hits) {
      const filteredArticles = filterArrayByKeys(
        items.hits,
        deletedArticlesItems,
        ['objectID'],
      );
      highlightedArticle = filteredArticles[0] || null;
      articleList = filteredArticles.slice(1);
    }

    return {
      articles: articleList,
      highlightedArticle,
    };
  }, [items, deletedArticlesItems]);

  useEffect(() => {
    console.log('ewe', {favoriteArticles: favoriteArticles.length});
  }, [favoriteArticles]);

  const addFavorite = useCallback((article: Article) => {
    handleFavorite(article);
  }, []);

  const deleteArticles = useCallback(
    (article: Article) => {
      removedArticles(article);
    },
    [removedArticles],
  );

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      // await refetch();
      cacheRefetch();
    } catch (error) {
      Logger.log('useHome - onRefresh', {error});
    } finally {
      setIsRefreshing(false);
    }
  }, [cacheRefetch]);

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
        console.log('ewewe openArticle', {isValidUrl});
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
