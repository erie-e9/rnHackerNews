import {useCallback} from 'react';
import {Alert} from 'react-native';
import {useArticlesFavorites} from '@hooks';
import {Article} from '@types';

export const useFavorites = () => {
  const {favoriteArticles, handleFavorite, removeAllFavorites} =
    useArticlesFavorites();

  const getFavorites = useCallback(() => {
    return {favorites: favoriteArticles};
  }, [favoriteArticles]);

  const switchFavorite = useCallback((favorite: Article) => {
    handleFavorite(favorite);
  }, []);

  const clearFavoritesArticles = useCallback(() => {
    Alert.alert(
      'Clear favorite articles',
      `Are you sure? This action isn't reversible`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: `I'm sure`,
          style: 'destructive',
          onPress: removeAllFavorites,
        },
      ],
      {
        cancelable: true,
      },
    );
  }, []);

  return {
    getFavorites,
    switchFavorite,
    clearFavoritesArticles,
  };
};
