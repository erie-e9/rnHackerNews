import { Article } from "@types";

export type ArticlesState = {
  content?: any;
  savedArticlesItems: Array<Article>;
  deletedArticlesItems: Array<Article>;
};

export type ArticlesPayload = {
  payload: Partial<ArticlesState>;
};
