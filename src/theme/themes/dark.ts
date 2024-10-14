import themes from './themes.json';

export const darkMode = () => {
  return {
    mode: 'dark',
    isDarkMode: true,
    tokens: {
      colors: themes.theme0.dark,
    },
  };
};
