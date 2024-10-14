import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type FavoritesState } from '@slices/types/favorites';
import { Article } from '@utils/types';

const initialState: FavoritesState = {
  favoriteArticles: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, { payload }: PayloadAction<Article>) => {
      const existingArticle = state.favoriteArticles.find(
        article => article.objectID === payload.objectID,
      );
      if (!existingArticle) {
        state.favoriteArticles = [...state.favoriteArticles, payload];
      }
    },
    removeFavorite: (state, { payload }: PayloadAction<string>) => {
      state.favoriteArticles = state.favoriteArticles.filter(
        article => article.objectID !== payload,
      );
    },
    toggleFavorite: (state, { payload }: PayloadAction<Article>) => {
      const existingArticleIndex = state.favoriteArticles.findIndex(
        article => article.objectID === payload.objectID,
      );

      if (existingArticleIndex >= 0) {
        state.favoriteArticles = state.favoriteArticles.filter(
          article => article.objectID !== payload.objectID,
        );
      } else {
        state.favoriteArticles = [...state.favoriteArticles, payload];
      }
    },
    deleteAllFavorites: (state) => {
      state.favoriteArticles = [];
    },
  },
});

export const { addFavorite, removeFavorite, deleteAllFavorites, toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
