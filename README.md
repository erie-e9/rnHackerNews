## Introduction

This project is a React Native CLI application designed to showcase articles from Hacker News. It features functionality such as managing favorites, deleting articles, and offline caching. The app also supports multiple languages and provides a smooth user experience through animations, optimized lists, and push notifications.

## Features

- ✅ Fetches articles from the Hacker News API.
- ✅ Handles offline data storage and caching.
- ✅ Allows users to mark articles as favorites, delete them from the home screen, and view a history of actions.
- ✅ In-app web viewer for articles.
- ✅ Push notifications.
- ✅ Optimized performance with FlashList.
- ✅ Multilingual support using i18next.
- ✅ Smooth UI animations with Lottie and Reanimated.
- ✅ Home screen: First article highlighted.
- ✅ Settings: Options to toggle background fetching and notifications.
- ⭕️ Unit testing: Pending...
- ✅ Architecture: Follows SOLID principles, Atomic Design, KISS, DRY, and Clean Code.
- ✅ Well-optimized code for performance.
- ✅ UI/UX/DX enhancements.
- ✅ Custom hooks for maintainable code.
- ✅ Android optimization: Proguard, split builds, and useLegacyPackaging for faster build times.

## Results

**Download App:**

[Download APK](https://drive.google.com/file/d/1WugWb25kC35c7QpdCDy1ffnnTETWHqP4/view?usp=sharing)

### Screenshots

#### Home (Article fetching, pull to refresh, highlighted article)

![home](https://github.com/user-attachments/assets/a89534a9-1de1-4df5-a8af-80ee44a432f7)

#### Open Article (URL checker, in-app browser)

![open article](https://github.com/user-attachments/assets/13efa4a9-4fc7-4da2-978c-5f87be358889)

#### Favorites (UI handler, actions: Add, remove, clear all, view all favorites)

![favorites](https://github.com/user-attachments/assets/bf6fc701-1d2f-428f-ac8b-20f6fcefea8c)

#### Deleted Items (UI handler, actions: Add, remove, clear all, view all deleted items)

![delete](https://github.com/user-attachments/assets/98c09167-2466-4145-8af7-60a3fb6b82cd)

#### Settings (Settings screen, toggle switches, account items)

![settings](https://github.com/user-attachments/assets/6a299aa2-81f8-40e5-896a-daa0a83b2530)

#### Offline Data (Offline message in header and stored data view)

![offline data](https://github.com/user-attachments/assets/599dd60f-37ee-44b7-8752-b8184a59e16b)

## Key Out-of-the-box Libraries (Better than the most popular options)

- **@reduxjs/toolkit**: Manages global state and data fetching via RTK Query, ensuring clean and maintainable state management.
- **@shopify/flash-list**: Replaces FlatList for rendering lists efficiently, especially with large datasets, significantly improving performance and memory usage.
- **react-native-mmkv**: Used for offline storage, offering better performance than AsyncStorage, with faster access and support for larger data volumes.
- **i18next and react-i18next**: Simplifies multi-language support, allowing dynamic localization in the app.
- **react-native-reanimated**: Provides smooth and efficient animations, offering better control and performance compared to standard React Native animations.
- **Lottie and lottie-react-native**: Adds visually appealing animations for splash screens and loading indicators, enhancing the overall user experience.
- **redux-persist**: Persists Redux state across sessions, ensuring the app's state is saved even after being closed.
- **styled-components**: Simplifies theming and styling, making the code more maintainable and dynamic.

## Setup

To run the project:

1. Install dependencies:

```bash
yarn install
# or
npm install
```

2. Run the app:

```bash
npx react-native run-android
# or
npx react-native run-ios
```
