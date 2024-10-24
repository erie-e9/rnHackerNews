import React, {memo} from 'react';
import {type ApplicationScreenProps} from '@types';
import {AnimatedButton} from '@components/animated';
import {Hightlights, ArticleList} from '@components/organisms';
import {ListTemplate} from '@components/templates';
import {useHome} from './hooks/useHome';
import {FeatureButton, FeaturesContainer} from './styles';

export interface HomeProps {
  navigation: ApplicationScreenProps;
}

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const useHomeHook = useHome();

  return (
    <ListTemplate
      title={'common:appName.full'}
      description={useHomeHook.todayDate}
      headerOptions={
        <FeaturesContainer>
          <FeatureButton>
            <AnimatedButton
              onPress={() =>
                navigation.navigate('Shared', {
                  screen: 'SettingsMenu',
                })
              }
              source="menu"
              size={80}
            />
          </FeatureButton>
        </FeaturesContainer>
      }
      body={
        <>
          {useHomeHook.articlesData.articles.length > 0 &&
            useHomeHook.articlesData.highlightedArticle && (
              <Hightlights
                article={useHomeHook.articlesData.highlightedArticle}
                leftAction={useHomeHook.deleteArticles}
                rightAction={useHomeHook.addFavorite}
                onTouch={useHomeHook.openArticle}
              />
            )}
          <ArticleList
            articles={useHomeHook.articlesData.articles}
            isFetching={useHomeHook.loading}
            leftAction={useHomeHook.addFavorite}
            rightAction={useHomeHook.deleteArticles}
            refetch={useHomeHook.onRefresh}
          />
        </>
      }
    />
  );
};

export default memo(Home);
