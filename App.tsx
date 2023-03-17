/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import AppNavigator from './navigations/AppNavigator';
import {ClothesProvider} from './src/context';
import RNUxcam from 'react-native-ux-cam';
import {UXCAM_API_KEY} from 'react-native-dotenv';

RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
const configuration = {
  userAppKey: UXCAM_API_KEY,
  enableAutomaticScreenNameTagging: false,
  enableImprovedScreenCapture: true,
};
RNUxcam.startWithConfiguration(configuration);

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  console.log('====================================');
  console.log('uxcam key coming');
  console.log('====================================');
  console.log(UXCAM_API_KEY);

  return (
    <ClothesProvider>
      <AppNavigator />
    </ClothesProvider>
  );
};
export default App;
