import {useCallback} from 'react';
import {Alert} from 'react-native';
import {useArticles} from '@hooks';

export const useDeletedArticles = () => {
  const {deletedArticlesItems, removedAllArticles} = useArticles();
  const getDeletedArticles = useCallback(() => {
    return {deletedArticles: deletedArticlesItems};
  }, [deletedArticlesItems]);

  const clearDeletedArticles = useCallback(() => {
    Alert.alert(
      'Clear deleted articles',
      `Are you sure? This action isn't reversible`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: `I'm sure`,
          style: 'destructive',
          onPress: removedAllArticles,
        },
      ],
      {
        cancelable: true,
      },
    );
  }, []);

  return {
    getDeletedArticles,
    clearDeletedArticles,
  };
};
