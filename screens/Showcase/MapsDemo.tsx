import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MapsDemo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="map-marker" size={40} color={COLORS.primary} />
          <Text style={styles.title}>Maps & Location</Text>
          <Text style={styles.subtitle}>Placeholder for map integration</Text>
        </View>

        <View style={styles.placeholderContainer}>
          <MaterialCommunityIcons name="map" size={120} color={COLORS.lightGray} />
          <Text style={styles.placeholderTitle}>Maps Integration</Text>
          <Text style={styles.placeholderText}>
            This screen is ready for react-native-maps integration
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planned Features</Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Display interactive maps</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Show user location</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Place markers on map</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Geolocation services</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.featureText}>Distance calculations</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information" size={24} color="#2196F3" />
          <Text style={styles.infoText}>
            To enable maps, install react-native-maps and configure it for your platform.
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
  placeholderContainer: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 40,
    alignItems: 'center',
  },
  placeholderTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 8,
  },
  placeholderText: {
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
    backgroundColor: '#E3F2FD',
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

export default MapsDemo;
