# 🚌 Bus Captain - React Native

A modern React Native app for tracking real-time bus arrivals in Singapore. This is a complete rewrite of the original Swift iOS app using React Native with TypeScript, enabling both iOS and Android support from a single codebase.

## ✨ Features

- 🎯 Real-time bus arrival tracking
- 📍 Nearby bus stops based on current location
- ⭐ Favorites management
- 🔔 Push notifications for bus arrivals
- 🗺️ Google Maps integration
- 🔍 Advanced bus stop search
- 🌓 Theme support (coming soon)
- 📱 iOS & Android support

## 🛠️ Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation 6
- **Backend:** Firebase Realtime Database
- **Maps:** React Native Maps (Google Maps)
- **Location:** Expo Location
- **Storage:** AsyncStorage
- **Data Fetching:** React Query (TanStack Query)

## 📁 Project Structure

```
src/
├── api/                    # API services
│   └── firebase/           # Firebase API calls
├── components/             # Reusable components
│   ├── common/             # Common UI components
│   ├── bus/                # Bus-specific components
│   └── map/                # Map components
├── screens/                # App screens
├── navigation/             # Navigation configuration
├── store/                  # Redux store
│   └── slices/             # Redux slices
├── hooks/                  # Custom React hooks
├── services/               # Business logic services
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── theme/                  # Theme configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- For iOS: Xcode (macOS only)
- For Android: Android Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/techieagent001/BusCaptainRN.git
   cd BusCaptainRN
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Copy your Firebase config to `src/api/firebase/config.ts`
   
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     databaseURL: "YOUR_DATABASE_URL",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

4. **Configure LTA DataMall API** (Optional - for real-time arrivals)
   - Register at https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html
   - Add your API key to `src/api/firebase/busArrivals.ts`

5. **Run the app**
   ```bash
   # Start Expo development server
   npm start

   # Run on iOS
   npm run ios

   # Run on Android
   npm run android
   ```

## 📱 Development

### Running on Device

1. Install Expo Go app on your device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Scan the QR code from the Expo Dev Tools

### Building for Production

```bash
# Build iOS
eas build --platform ios

# Build Android
eas build --platform android
```

## 🗺️ Migration from Swift

This React Native version is a complete rewrite of the original Swift iOS app with significant improvements:

### Key Improvements

- **Cross-platform:** iOS + Android from single codebase
- **~70% less code:** Modern hooks and component patterns
- **Better architecture:** Clean separation with Redux and services
- **Type safety:** Full TypeScript support
- **Easier testing:** Jest and React Testing Library
- **Faster development:** Hot reload and Expo tools

### Feature Parity

| Feature | Swift App | React Native |
|---------|-----------|--------------|
| Real-time arrivals | ✅ | ✅ |
| Nearby stops | ✅ | ✅ |
| Favorites | ✅ | ✅ |
| Search | ✅ | ✅ |
| Notifications | ✅ | 🚧 In progress |
| Maps | ✅ | 🚧 In progress |
| Background location | ✅ | 🚧 In progress |
| MRT integration | ✅ | 📋 Planned |

## 📚 Documentation

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Original Swift app by Bang Wei Ngo
- LTA DataMall for public transport data
- Singapore bus enthusiasts community

## 📧 Contact

Project Link: https://github.com/techieagent001/BusCaptainRN

---

**Built with ❤️ for Singapore's bus commuters**
