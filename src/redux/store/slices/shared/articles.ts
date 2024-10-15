import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ArticlesState, type ArticlesPayload } from '@slices/types/articles';
import { Article } from '@types';

const initialState: ArticlesState = {
  savedArticlesItems: [],
  deletedArticlesItems: [],
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    storeArticles: (state, { payload }: PayloadAction<Article[]>) => {
      state.savedArticlesItems = payload;
    },
    deletedArticles: (state, { payload }: PayloadAction<Article>) => {
      const existingArticle = state.deletedArticlesItems.find(
        article => article.objectID === payload.objectID,
      );
      if (!existingArticle) {
        state.deletedArticlesItems.push(payload);
      }
    },
    deleteAllArticles: (state) => {
      state.deletedArticlesItems = [];
    },
  },
});

export const { storeArticles, deletedArticles, deleteAllArticles } = articleSlice.actions;

export default articleSlice.reducer;
