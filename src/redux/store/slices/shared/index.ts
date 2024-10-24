export {
  default as appPreferences,
  changeLanguage,
  changeMode,
  switchNotifications,
  switchBackgroundFetch,
  changeTopic,
} from '@slices/shared/appPreferences';
export { default as articles, deletedArticles, deleteAllArticles } from '@slices/shared/articles';
export { default as favorites, addFavorite, removeFavorite, toggleFavorite, deleteAllFavorites } from '@slices/shared/favorites';
export {
  default as responseHandler,
  setLoadingState,
  setErrorState,
} from '@slices/shared/responseHandler';
export { default as todos, clearError } from '@slices/shared/todos';