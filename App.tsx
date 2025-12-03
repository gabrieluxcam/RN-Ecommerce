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
import {DemoProvider} from './src/state';
import {DebugPanelProvider} from './src/debug';

// import {log} from 'react-native-reanimated';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  return (
    <DemoProvider>
      <DebugPanelProvider>
        <ClothesProvider>
          <AppNavigator />
        </ClothesProvider>
      </DebugPanelProvider>
    </DemoProvider>
  );
};
export default App;
