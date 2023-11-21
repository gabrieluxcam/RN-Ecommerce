/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import AppNavigator from './navigations/AppNavigator';
import {ClothesProvider} from './src/context';
import RNUxcam from 'react-native-ux-cam';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [isStarted, setStarted] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    const config = {
      userAppKey: '2c03jxhvos3e8c9',
      enableAutomaticScreenNameTagging: false,
      enableImprovedScreenCapture: true,
    };

    if (isStarted) {
      RNUxcam.optIntoSchematicRecordings();
      RNUxcam.startWithConfiguration(config);
      console.log('====================================');
      console.log('UXCAM STARTING');
      console.log('====================================');
    }
  }, [isStarted]);

  const handleTimeOut = () => {
    setStarted(true);
    console.log('====================================');
    console.log(isStarted);
    console.log('====================================');
  };

  setTimeout(handleTimeOut, 2000);

  return (
    <ClothesProvider>
      <AppNavigator />
    </ClothesProvider>
  );
};
export default App;
