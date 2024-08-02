# Ecommerce Demo App For UXCam

## Installation
```bash
bundle install
yarn install # or, npm install 
```

## Setup Old Architecture

### iOS
Run in terminal
```bash
cd ios
pod install
cd ..
```

### Android
1. Go to `android/gradle.properties` file
2. Set `newArchEnabled=false`

## Setup New Architecture

### iOS
Run `yarn pod-install`  in terminal 

### Android
1. Go to `android/gradle.properties` file
2. Set `newArchEnabled=true`

## Run App
1. Run `npx react-native start` in terminal
2. Open New terminal
    - `npx react-native run-ios` (For iOS)
    - `npx react-native run-android` (For Android)