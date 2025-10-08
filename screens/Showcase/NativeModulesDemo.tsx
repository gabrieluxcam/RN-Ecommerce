import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, TouchableOpacity, Alert, Linking} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NativeModulesDemo = () => {
  const handlePlatformInfo = () => {
    Alert.alert(
      'Platform Info',
      `OS: ${Platform.OS}\nVersion: ${Platform.Version}\nisPad: ${Platform.isPad}\nisTV: ${Platform.isTV}`,
    );
  };

  const handleOpenURL = () => {
    Linking.openURL('https://reactnative.dev');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="code-braces" size={40} color={COLORS.primary} />
          <Text style={styles.title}>Native Modules</Text>
          <Text style={styles.subtitle}>Platform-specific features & APIs</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Platform:</Text>
              <Text style={styles.infoValue}>{Platform.OS}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version:</Text>
              <Text style={styles.infoValue}>{Platform.Version}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Is iPad:</Text>
              <Text style={styles.infoValue}>{Platform.isPad ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Is TV:</Text>
              <Text style={styles.infoValue}>{Platform.isTV ? 'Yes' : 'No'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePlatformInfo}>
            <MaterialCommunityIcons name="information" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Show Platform Alert</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Linking Module</Text>
          <Text style={styles.description}>Open URLs and deep links</Text>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleOpenURL}>
            <MaterialCommunityIcons name="open-in-new" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Open React Native Docs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Native Modules</Text>
          <View style={styles.moduleItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleName}>Platform</Text>
              <Text style={styles.moduleDesc}>OS detection and version info</Text>
            </View>
          </View>
          <View style={styles.moduleItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleName}>Linking</Text>
              <Text style={styles.moduleDesc}>URL handling and deep links</Text>
            </View>
          </View>
          <View style={styles.moduleItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleName}>Alert</Text>
              <Text style={styles.moduleDesc}>Native alert dialogs</Text>
            </View>
          </View>
          <View style={styles.moduleItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleName}>Dimensions</Text>
              <Text style={styles.moduleDesc}>Screen dimensions API</Text>
            </View>
          </View>
          <View style={styles.moduleItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleName}>Vibration</Text>
              <Text style={styles.moduleDesc}>Device vibration control</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Native Modules</Text>
          <Text style={styles.description}>
            You can create custom native modules to bridge platform-specific functionality:
          </Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="language-java" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Android: Kotlin/Java modules</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="language-swift" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>iOS: Swift/Objective-C modules</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="code-json" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Expose native APIs to JavaScript</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="lightbulb" size={24} color="#FF9800" />
          <Text style={styles.infoText}>
            Native modules allow you to access platform-specific features not available in JavaScript.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: 16,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: COLORS.lightGray2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  infoLabel: {
    ...FONTS.body3,
    color: COLORS.gray,
    fontWeight: '600',
  },
  infoValue: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleName: {
    ...FONTS.body3,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleDesc: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  featureText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
  },
  infoText: {
    ...FONTS.body4,
    color: COLORS.black,
    flex: 1,
  },
});

export default NativeModulesDemo;
