import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logger } from '@services';
import { storeArticles, deletedArticles, deleteAllArticles } from '@slices/shared';
import { type ArticlesState } from '@slices/types/articles';
import { Article } from '@types';

export const useArticles = (): {
    saveArticles: (articles: Article[]) => void;
    savedArticlesItems: Array<Article>;
    deletedArticlesItems: Array<Article>;
    removedArticles: (removedArticleParam: Article) => void;
    removedAllArticles: () => void;
} => {
    const dispatch = useDispatch();

    const { savedArticlesItems, deletedArticlesItems } = useSelector(
        (state: { articles: ArticlesState }) => state.articles,
    );

    const saveArticles = useCallback((articles: Article[]) => {
        try {
            dispatch(storeArticles(articles));
        } catch (error) {
            Logger.error('[useArticles] saveArticles:', { error });
        }
    }, [dispatch]);

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
        savedArticlesItems,
        saveArticles,
        deletedArticlesItems,
        removedArticles,
        removedAllArticles,
    };
};
