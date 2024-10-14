export type Language = 'en' | 'es' | null;
// export type Mode = boolean | 'sunflower' | null;
export type Mode = 'dark' | 'light' | 'sunflower' | null;

export type AppPreferencesState = {
  mode: Mode;
  language: Language;
  notifications: boolean;
  backgroundFetch: boolean;
};

export type AppPreferencesPayload = {
  payload: Partial<AppPreferencesState>;
};
