## Introduction

This project is a React Native CLI application designed to showcase articles from Hacker News, with functionalities like favorite management, deletion, and offline caching. It also supports multiple languages and offers a fluid user experience using animations, optimized lists, and push notifications.

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
![DOWNLOAD APK](https://drive.google.com/file/d/1WugWb25kC35c7QpdCDy1ffnnTETWHqP4/view?usp=sharing)
 
#### Home (article fetching, pull action, hightlighted article)
![home](https://github.com/user-attachments/assets/a89534a9-1de1-4df5-a8af-80ee44a432f7)

#### Open article (url checker, oepn on in-app browser)
![open article](https://github.com/user-attachments/assets/13efa4a9-4fc7-4da2-978c-5f87be358889)

#### Favorite (UI handler, Actions: Add, remove, clear all, show all favorites)
![favorites](https://github.com/user-attachments/assets/bf6fc701-1d2f-428f-ac8b-20f6fcefea8c)

#### Delete (UI handler, Actions: Add, remove, clear all, show all deleted items)
![delete](https://github.com/user-attachments/assets/98c09167-2466-4145-8af7-60a3fb6b82cd)

#### Settings (Settings screen, swtich handlers, account items)
![Simulator Screen Recording - 15 Pro - 17 5 - 2024-10-15 at 00 46 52](https://github.com/user-attachments/assets/6a299aa2-81f8-40e5-896a-daa0a83b2530)

#### Offline data (Offile message in header and showing stored data)
![Simulator Screen Recording - 15 Pro - 17 5 - 2024-10-15 at 00 48 14](https://github.com/user-attachments/assets/599dd60f-37ee-44b7-8752-b8184a59e16b)



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
