import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';

interface FloatingDebugButtonProps {
  onPress: () => void;
}

const FloatingDebugButton = ({onPress}: FloatingDebugButtonProps) => {
  if (!__DEV__) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>Debug</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default FloatingDebugButton;

