## Introduction

This project is a React Native application designed to showcase articles from Hacker News, with functionalities like favorite management, deletion, and offline caching. It also supports multiple languages and offers a fluid user experience using animations, optimized lists, and push notifications.

## Features

Fetches articles from an API (Hacker News)
Handles offline data storage and caching
Users can mark articles as favorites or delete them
Push notifications for updates
Optimized performance with FlashList
Multilingual support with i18next
Smooth UI animations with Lottie and Reanimated
Dependencies Overview

## Key Libraries

- @reduxjs/toolkit: Manages global state and data fetching via RTK Query, ensuring clean code and easy-to-maintain state management.
- @shopify/flash-list: Replaces FlatList for rendering lists efficiently, especially with large datasets, improving performance and memory usage.
- react-native-mmkv: Used for offline storage, chosen over AsyncStorage for its better performance and smaller footprint. MMKV is significantly faster and supports larger data volumes.
- i18next and react-i18next: Provides easy integration for multi-language support in the app, allowing dynamic localization.
- react-native-reanimated: Handles complex animations smoothly, offering better control and performance over standard React Native animations.
- Lottie and lottie-react-native: Used to integrate beautiful animations for splash screens and loading indicators, enhancing the user experience.
- redux-persist: Helps persist Redux state, making sure the app state is saved across sessions, even if the user closes the app.

## Other Notable Packages

- react-native-device-info: Provides information about the user's device, such as the device model or unique ID.
- react-native-localize: Detects and handles language, region, and timezone settings.
- react-native-permissions: Simplifies requesting permissions, such as push notifications.
- react-native-webview: Allows the display of web content within the app.
- styled-components: Handles theming and styling in a more maintainable and dynamic way.

## Why These Choices?

- FlashList over FlatList: For better performance in rendering large data sets with smooth scrolling.
- MMKV over AsyncStorage: Provides faster read/write operations and better performance overall, especially for large datasets, while consuming less memory.
- Redux Toolkit: Simplifies state management and API integration by providing built-in tools, reducing boilerplate code.
- Reanimated: Allows complex animations to be handled natively, improving performance and offering smoother transitions.

## Folder Structure

- /components: Contains reusable UI components like ArticleList and ArticleItem.
- /screens: Contains the primary screens such as HomeScreen, FavoritesScreen.
- /services: Includes API services (e.g., articleService.ts) and push notification handlers.
- /redux: Manages the store, slices, and middleware configuration.

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

✅ Data Fetching
✅ Offline Access
✅ Article Viewing
✅ Delete Functionality

✅ Favorites
✅ Deleted Articles View

Push Notification Permission
✅ User Preferences
✅ Background Fetch
Notification Interaction

✅ Language
Unit Testing

Functionality
✅ Code Quality
✅ UI/UX
Documentation
