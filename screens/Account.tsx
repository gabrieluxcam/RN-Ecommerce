import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../src/types/NavigationTypes'; // Adjust the import path as needed

type AccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebViewScreen'
>;

export default function Account() {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  function handlePress(buttonName: string) {
    console.log('====================================');
    console.log(`${buttonName} Pressed!`);
    console.log('====================================');
    if (buttonName === 'Test1') {
      navigation.navigate('WebViewScreen');
    }
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
          title="Test2"
          onPress={() => handlePress('Test2')}
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
