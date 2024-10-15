## Introduction

This project is a React Native application designed to showcase articles from Hacker News, with functionalities like favorite management, deletion, and offline caching. It also supports multiple languages and offers a fluid user experience using animations, optimized lists, and push notifications.

## Features

- ✅ Fetches articles from an API (Hacker News).
- ✅ Handles offline data storage and caching.
- ✅ Users can mark articles as favorites or delete them from home and create an historial.
- ✅ Article webviewer screen.
- ✅ Push notifications.
- ✅ Optimized performance with FlashList.
- ✅ Multilingual support with i18next.
- ✅ Smooth UI animations with Lottie and Reanimated.
- ✅ Home: First article as highlight UI.
- ✅ Settings: Toggle Background fetching and notifications.
- ⭕️ Unit testing: Pending...
- ✅ Architecture: Solid principles, Atomic design, KISS and DRY, Clean code.
- ✅ Well performanced code.
- ✅ UI/UX/DX.
- ✅ Custom hooks for maintenable code
- ✅ Android optimization: Proguard, splitted builds, and useLegacyPackaging for better builds.

## Results

### Home (article fetching, pull action, hightlighted article)

### Open article (url checker, oepn on in-app browser)

### Favorite (UI handler, Actions: Add, remove, clear all, show all favorites)

### Delete (UI handler, Actions: Add, remove, clear all, show all deleted items)

### Settings (Settings screen, swtich handlers, account items)

## Key Libraries out-of-box (better than most populars)

- @reduxjs/toolkit: Manages global state and data fetching via RTK Query, ensuring clean code and easy-to-maintain state management.
- @shopify/flash-list: Replaces FlatList for rendering lists efficiently, especially with large datasets, improving performance and memory usage.
- react-native-mmkv: Used for offline storage, chosen over AsyncStorage for its better performance and smaller footprint. MMKV is significantly faster and supports larger data volumes.
- i18next and react-i18next: Provides easy integration for multi-language support in the app, allowing dynamic localization.
- react-native-reanimated: Handles complex animations smoothly, offering better control and performance over standard React Native animations.
- Lottie and lottie-react-native: Used to integrate beautiful animations for splash screens and loading indicators, enhancing the user experience.
- redux-persist: Helps persist Redux state, making sure the app state is saved across sessions, even if the user closes the app.
- styled-components: Handles theming and styling in a more maintainable and dynamic way.

## Setup

To run the project:

Install dependencies:
bash

```
yarn install

# or

npm install
```

Run the app:
bash

```
npx react-native run-android

# or

npx react-native run-ios
```
