// components/ArticleList.tsx
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {Article} from '@types';
import {ArticleItem} from '@components/molecules';
import {
  EmptyContainer,
  EmptyText,
  ListContainer,
  LoaderContainer,
} from './styles';

type ArticleListProps = {
  articles: Article[];
  leftAction?: (article: Article) => void;
  rightAction?: (article: Article) => void;
  refetch?: () => void;
  isFetching?: boolean;
};

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  rightAction,
  leftAction,
  refetch,
  isFetching = false,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(isFetching);
  }, [isFetching, refreshing, setRefreshing, refetch]);

  const onRefresh = useCallback(async () => {
    await setRefreshing(true);
    await refetch?.();
    await setRefreshing(false);
  }, []);

  return (
    <ListContainer>
      {!isFetching ? (
        <FlashList
          data={articles}
          keyExtractor={item => item.objectID}
          renderItem={({item}) => (
            <ArticleItem
              article={item}
              leftAction={leftAction ? () => leftAction(item) : undefined}
              rightAction={rightAction ? () => rightAction(item) : undefined}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          estimatedItemSize={200}
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyText type="Body1">{'home:noArticles'}</EmptyText>
            </EmptyContainer>
          }
        />
      ) : (
        <LoaderContainer>
          <ActivityIndicator />
        </LoaderContainer>
      )}
    </ListContainer>
  );
};

export default memo(ArticleList);
