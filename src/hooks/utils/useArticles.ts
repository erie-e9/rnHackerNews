import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logger } from '@services';
import { deletedArticles, deleteAllArticles } from '@slices/shared';
import { type ArticlesState } from '@slices/types';
import { useGetArticlesQuery } from '@hooks/api';
import { Article } from '@types';

export const useArticles = () => {
    const dispatch = useDispatch();

    const { articles, deletedArticlesItems } = useSelector(
        (state: { articles: ArticlesState }) => state.articles,
    );

    const { data, isLoading, error, refetch } = useGetArticlesQuery('books');

    const removedArticles = useCallback((removedArticle: Article): void => {
        try {
            dispatch(deletedArticles(removedArticle));
        } catch (error) {
            Logger.error('[useArticles] removedArticles:', { error });
        }
    }, [dispatch]);

    const removedAllArticles = useCallback((): void => {
        try {
            dispatch(deleteAllArticles());
        } catch (error) {
            Logger.error('[useArticles] removedAllArticles:', { error });
        }
    }, [dispatch]);

    return {
        data: data?.hits || articles?.hits,
        isLoading,
        error,
        deletedArticlesItems,
        removedArticles,
        removedAllArticles,
        refetch
    };
};
