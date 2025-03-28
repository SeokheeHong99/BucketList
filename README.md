# BucketList

A mobile application built with Expo and React Native for creating and tracking your bucket list items.

## Getting Started

### Prerequisites

- Node.js
- npm
- Expo Go app installed on your mobile device (optional, for testing on physical device)
- iOS simulator (for iOS testing)
- Android emulator (for Android testing, optional)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Fix dependency issues:

```bash
npm run fix-deps
```

3. Start the Expo development server:

```bash
npm start
```

### Running on Simulators/Devices

- To run on iOS simulator:
```bash
npm run ios
```

- To run on Android emulator:
```bash
npm run android
```

- To run on web:
```bash
npm run web
```

- To run on a physical device:
  1. Start the Expo server: `npm start`
  2. Scan the QR code with your camera (iOS) or the Expo Go app (Android)

## Troubleshooting

### Dependency Issues

If you see warnings about incompatible dependencies:

### iOS Simulator Issues

If you encounter problems launching the app in iOS Simulator:

1. Close the simulator completely and restart it
2. Try using the localhost flag: `npx expo start --ios --localhost`
3. Reset simulator settings: In Simulator menu, go to "Device" > "Erase All Content and Settings"
4. Make sure your Mac's firewall isn't blocking connections
5. Run with minimal options: `npx expo start --ios -c --no-dev`

## Notes

- This project uses the local Expo CLI (`npx expo`) instead of the deprecated global expo-cli