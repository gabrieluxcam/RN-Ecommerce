import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TestPage2 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="flask" size={80} color={COLORS.lightGray} />
        <Text style={styles.title}>Test Page 2</Text>
        <Text style={styles.subtitle}>Blank placeholder for future testing</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This is a blank test page ready for your custom implementations.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  infoBox: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },
  infoText: {
    ...FONTS.body4,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default TestPage2;
