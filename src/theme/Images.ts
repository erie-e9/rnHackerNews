import { type ThemeVariables } from '@types';

export default function ({ }: ThemeVariables) {
  return {
    wallpapers: {
      doddle: require('@assets/shared/images/doddle.png')
    },
    icons: {
      icon: require('@assets/shared/images/hackernews.png')
    },
  };
}
