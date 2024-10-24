import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logger } from '@services';
import { toggleFavorite, deleteAllFavorites } from '@slices/shared';
import { type FavoritesState } from '@slices/types';
import { Article } from '@types';

export const useArticlesFavorites = () => {
    const dispatch = useDispatch();

    const { favoriteArticles } = useSelector(
        (state: { favorites: FavoritesState }) => state.favorites
    );

    const handleFavorite = useCallback((article: Article): void => {
        try {
            dispatch(toggleFavorite(article));

        } catch (error) {
            Logger.error('[useArticlesFavorites] handleFavorite:', { error });
        }
    }, []);

    const removeAllFavorites = useCallback((): void => {
        try {
            dispatch(deleteAllFavorites());
        } catch (error) {
            Logger.error('[useArticlesFavorites] removeAllFavorites:', { error });
        }
    }, []);

    return {
        handleFavorite,
        favoriteArticles,
        removeAllFavorites,
    };
};
