import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../src/types/NavigationTypes'; // Adjust the import path as needed
import RNUxcam from 'react-native-ux-cam';
import {useFocusEffect} from '@react-navigation/native';

type AccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebViewScreen'
>;

export default function Account() {
  useFocusEffect(() => {
    RNUxcam.tagScreenName('Testing Screen');
    RNUxcam.allowShortBreakForAnotherApp(false);
  });
  const navigation = useNavigation<AccountScreenNavigationProp>();
  function handlePress(buttonName: string) {
    console.log('====================================');
    console.log(`${buttonName} Pressed!`);
    console.log('====================================');
    if (buttonName === 'Test1') {
      navigation.navigate('WebViewScreen');
    }
    // if (buttonName === 'Allow Short BReak') {
    //   RNUxcam.allowShortBreakForAnotherApp(true);
    // }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Test1"
          onPress={() => handlePress('Test1')}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Allow Short BReak"
          onPress={() => RNUxcam.allowShortBreakForAnotherApp(true)}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Test3"
          onPress={() => handlePress('Test3')}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Test4"
          onPress={() => handlePress('Test4')}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Test5"
          onPress={() => handlePress('Test5')}
          color="#00008B"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
