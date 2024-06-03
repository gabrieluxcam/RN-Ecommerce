import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../constants';
import {SecondSideMenuItemParamList} from '../src/types/NavigationTypes';
// screens
import Account from '../screens/Account';

const Stack = createStackNavigator<SecondSideMenuItemParamList>();

export default function AccountNavigator() {
  const navigation =
    useNavigation<StackNavigationProp<SecondSideMenuItemParamList>>();
  return (
    <Stack.Navigator initialRouteName={'Account'}>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          headerStyle: {
            //backgroundColor: '#f4511e',
          },
          headerTintColor: COLORS.lightGray,
          headerTitleStyle: {
            ...FONTS.navTitle,
          },
        }}
      />
    </Stack.Navigator>
  );
}
