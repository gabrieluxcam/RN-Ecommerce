import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default function Account() {
  function alert(_arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Button title="Press Me" onPress={() => alert('Button Pressed!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
