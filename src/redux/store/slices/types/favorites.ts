import { Article } from "@utils/types";

export type FavoritesState = {
  favoriteArticles: Article[];
};

export type FavoritesPayload = {
  payload: Partial<FavoritesState>;
};
