import { Article } from "@types";

export type ArticlesState = {
  content?: any;
  articles: Array<Article>;
  deletedArticlesItems: Array<Article>;
  loading: boolean;
  error: string | null;
};

export type ArticlesPayload = {
  payload: Partial<ArticlesState>;
};
