import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '@redux/store';
import { useArticlesApi } from '@hooks/api';
import { type ArticlesState, type ArticlesPayload } from '@slices/types/articles';
import { Article } from '@types';

const initialState: ArticlesState = {
  articles: [],
  deletedArticlesItems: [],
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      // GET articles
      .addMatcher(useArticlesApi.endpoints.getArticles.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(useArticlesApi.endpoints.getArticles.matchFulfilled, (state, { payload }: PayloadAction<any>) => {
        state.articles = payload
        state.loading = false;
        storage.set('articles', JSON.stringify(payload))
      })
      .addMatcher(useArticlesApi.endpoints.getArticles.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching articles';
      })
  }
});

export const { deletedArticles, deleteAllArticles } = articleSlice.actions;

export default articleSlice.reducer;
