import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {AppDrawerParamList} from '../src/types/NavigationTypes';
// navigators
import AddressNavigator from './AddressNavigator';
import HomeNavigator from './HomeNavigator';
import LoginNavigator from './LoginNavigator';
import MenuNavigator from './MenuNavigator';
import ProductListNavigator from './ProductListNavigator';
import AccountNavigator from './AccountNavigator';
//screen
import WebViewScreen from '../screens/WebViewScreen';
import Account from '../screens/Account';
// Showcase screens
import AnimationsDemo from '../screens/Showcase/AnimationsDemo';
import GesturesDemo from '../screens/Showcase/GesturesDemo';
import FormsDemo from '../screens/Showcase/FormsDemo';
import ListsDemo from '../screens/Showcase/ListsDemo';
import ChartsDemo from '../screens/Showcase/ChartsDemo';
import NetworkingDemo from '../screens/Showcase/NetworkingDemo';
import StorageDemo from '../screens/Showcase/StorageDemo';
import MapsDemo from '../screens/Showcase/MapsDemo';
import CameraDemo from '../screens/Showcase/CameraDemo';
import NativeModulesDemo from '../screens/Showcase/NativeModulesDemo';
import TestPage1 from '../screens/Showcase/TestPage1';
import TestPage2 from '../screens/Showcase/TestPage2';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Drawer = createDrawerNavigator<AppDrawerParamList>();
const Stack = createStackNavigator();

function AccountStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{title: 'Account'}}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{title: 'WebView'}}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name="HomePage"
          options={{drawerLabel: 'Home'}}
          component={HomeNavigator}
        />
        <Drawer.Screen
          name="Address"
          options={{drawerLabel: 'Address'}}
          component={AddressNavigator}
        />
        <Drawer.Screen
          name="Login"
          options={{drawerLabel: 'Login'}}
          component={LoginNavigator}
        />
        <Drawer.Screen
          name="ProductList"
          options={{drawerLabel: 'Products'}}
          component={ProductListNavigator}
        />
        <Drawer.Screen
          name="Categories"
          options={{drawerLabel: 'Categories'}}
          component={MenuNavigator}
        />

        {/* Feature Showcase Screens */}
        <Drawer.Screen
          name="AnimationsDemo"
          options={{drawerLabel: 'Animations Demo'}}
          component={AnimationsDemo}
        />
        <Drawer.Screen
          name="GesturesDemo"
          options={{drawerLabel: 'Gestures Demo'}}
          component={GesturesDemo}
        />
        <Drawer.Screen
          name="FormsDemo"
          options={{drawerLabel: 'Forms Demo'}}
          component={FormsDemo}
        />
        <Drawer.Screen
          name="ListsDemo"
          options={{drawerLabel: 'Lists & Performance'}}
          component={ListsDemo}
        />
        <Drawer.Screen
          name="MapsDemo"
          options={{drawerLabel: 'Maps & Location'}}
          component={MapsDemo}
        />
        <Drawer.Screen
          name="CameraDemo"
          options={{drawerLabel: 'Camera & Media'}}
          component={CameraDemo}
        />
        <Drawer.Screen
          name="ChartsDemo"
          options={{drawerLabel: 'Charts & Data Viz'}}
          component={ChartsDemo}
        />
        <Drawer.Screen
          name="NativeModulesDemo"
          options={{drawerLabel: 'Native Modules'}}
          component={NativeModulesDemo}
        />
        <Drawer.Screen
          name="NetworkingDemo"
          options={{drawerLabel: 'Networking & API'}}
          component={NetworkingDemo}
        />
        <Drawer.Screen
          name="StorageDemo"
          options={{drawerLabel: 'Storage Demo'}}
          component={StorageDemo}
        />

        {/* Test Pages */}
        <Drawer.Screen
          name="TestPage1"
          options={{drawerLabel: 'Test Page 1'}}
          component={TestPage1}
        />
        <Drawer.Screen
          name="TestPage2"
          options={{drawerLabel: 'Test Page 2'}}
          component={TestPage2}
        />

        <Drawer.Screen
          name="SecondSideMenuItem"
          options={{drawerLabel: 'Account Tests'}}
          component={AccountStackNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
