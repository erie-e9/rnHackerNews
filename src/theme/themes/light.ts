import themes from '@theme/themes/themes.json';

export const lightMode = () => {
  return {
    mode: 'light',
    isDarkMode: false,
    tokens: {
      colors: themes.theme0.light,
    },
  };
};
