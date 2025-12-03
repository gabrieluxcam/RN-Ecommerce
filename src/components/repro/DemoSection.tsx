import React, {ReactNode} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

interface DemoSectionProps extends ViewProps {
  title: string;
  description?: string;
  children?: ReactNode;
  testID?: string;
}

const DemoSection = ({
  title,
  description,
  children,
  style,
  testID,
  ...rest
}: DemoSectionProps) => {
  return (
    <View style={[styles.section, style]} testID={testID} {...rest}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 6,
  },
  content: {
    marginTop: 16,
  },
});

export default DemoSection;

