import React, {memo} from 'react';
import {Article} from '@types';
import {ArticleList} from '@components/organisms';
import {useFavorites} from './hooks/useFavorites';
import {ListTemplate} from '@components/templates';
import {FeatureButton, FeaturesContainer} from './styles';

export const Favorites: React.FC = () => {
  const useFavoritesHook = useFavorites();
  const {favorites} = useFavoritesHook.getFavorites();

  return (
    <ListTemplate
      title="Favorites"
      backButton
      headerOptions={
        <>
          {favorites.length > 0 && (
            <FeaturesContainer>
              <FeatureButton
                title="Clear all"
                onPress={() => useFavoritesHook.clearFavoritesArticles()}
              />
            </FeaturesContainer>
          )}
        </>
      }
      body={
        <ArticleList
          articles={favorites}
          rightAction={(article: Article) =>
            useFavoritesHook.switchFavorite(article)
          }
        />
      }
    />
  );
};

export default memo(Favorites);
