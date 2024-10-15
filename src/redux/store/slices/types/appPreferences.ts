export type Language = 'en' | 'es' | null;
// export type Mode = boolean | 'sunflower' | null;
export type Mode = 'dark' | 'light' | 'sunflower' | null;

export type Topic = 'android' | 'ios' | 'mobile';

export type AppPreferencesState = {
  mode: Mode;
  language: Language;
  topic: Topic;
  notifications: boolean;
  backgroundFetch: boolean;
};

export type AppPreferencesPayload = {
  payload: Partial<AppPreferencesState>;
};
