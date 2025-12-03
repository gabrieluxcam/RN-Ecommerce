import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

export interface ToolbarAction {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

interface ActionToolbarProps {
  actions: ToolbarAction[];
}

const ActionToolbar = ({actions}: ActionToolbarProps) => {
  if (!actions.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.label}
          style={[styles.button, action.disabled && styles.buttonDisabled]}
          onPress={action.onPress}
          disabled={action.disabled}
          activeOpacity={0.7}
          testID={action.testID}>
          <Text style={styles.buttonText}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginVertical: -4,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  buttonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  buttonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
});

export default ActionToolbar;

