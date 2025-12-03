import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  BlankCanvasScreen,
  LayoutStressScreen,
  NativeBridgeSandboxScreen,
  NetworkSandboxScreen,
  PerformanceBenchScreen,
  ReproLabHome,
} from '../screens/ReproLab';
import {ReproLabStackParamList} from '../src/types/NavigationTypes';

const Stack = createStackNavigator<ReproLabStackParamList>();

const ReproLabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="ReproLabHome"
        component={ReproLabHome}
        options={{title: 'Repro Lab'}}
      />
      <Stack.Screen
        name="BlankCanvas"
        component={BlankCanvasScreen}
        options={{title: 'Blank Canvas'}}
      />
      <Stack.Screen
        name="NetworkSandbox"
        component={NetworkSandboxScreen}
        options={{title: 'Network Sandbox'}}
      />
      <Stack.Screen
        name="NativeBridge"
        component={NativeBridgeSandboxScreen}
        options={{title: 'Native Bridge'}}
      />
      <Stack.Screen
        name="LayoutStress"
        component={LayoutStressScreen}
        options={{title: 'Layout Stress'}}
      />
      <Stack.Screen
        name="PerformanceBench"
        component={PerformanceBenchScreen}
        options={{title: 'Performance Bench'}}
      />
    </Stack.Navigator>
  );
};

export default ReproLabNavigator;

