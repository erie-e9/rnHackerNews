import React, {memo} from 'react';
import {ArticleList} from '@components/organisms';
import {useDeletedArticles} from './hooks/useDeletedArticles';
import {ListTemplate} from '@components/templates';
import {FeatureButton, FeaturesContainer} from './styles';

export const DeletedArticles: React.FC = () => {
  const useDeletedArticlesHook = useDeletedArticles();
  const {deletedArticles} = useDeletedArticlesHook.getDeletedArticles();

  return (
    <ListTemplate
      title="Deleted Articles"
      backButton
      headerOptions={
        <>
          {deletedArticles.length > 0 && (
            <FeaturesContainer>
              <FeatureButton
                title="Clear all"
                onPress={() => useDeletedArticlesHook.clearDeletedArticles()}
              />
            </FeaturesContainer>
          )}
        </>
      }
      body={<ArticleList articles={deletedArticles} />}
    />
  );
};

export default memo(DeletedArticles);
