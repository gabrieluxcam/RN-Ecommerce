import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../constants';
import {ActionToolbar, DemoSection} from '../../src/components/repro';
import {ReproLabStackParamList} from '../../src/types/NavigationTypes';

const cards = [
  {
    route: 'BlankCanvas' as keyof ReproLabStackParamList,
    title: 'Blank Canvas',
    description: 'Minimal screen with SafeArea + guidance for quick prototypes.',
  },
  {
    route: 'NetworkSandbox' as keyof ReproLabStackParamList,
    title: 'Network Sandbox',
    description: 'Toggle success/error responses, inspect mock network payloads.',
  },
  {
    route: 'NativeBridge' as keyof ReproLabStackParamList,
    title: 'Native Bridge',
    description:
      'Connect to platform modules or stub missing ones for reproductions.',
  },
  {
    route: 'LayoutStress' as keyof ReproLabStackParamList,
    title: 'Layout Stress',
    description:
      'Generate heavy UI trees to diagnose rendering and layout bottlenecks.',
  },
  {
    route: 'PerformanceBench' as keyof ReproLabStackParamList,
    title: 'Performance Bench',
    description:
      'Measure interaction timings and compare baseline vs experimental changes.',
  },
];

const ReproLabHome = () => {
  const navigation =
    useNavigation<NavigationProp<ReproLabStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="test-tube"
            color={COLORS.primary}
            size={32}
          />
          <View style={styles.headerTextWrapper}>
            <Text style={styles.title}>Repro Lab</Text>
            <Text style={styles.subtitle}>
              Purpose-built workspaces for replicating customer issues safely.
            </Text>
          </View>
        </View>

        <DemoSection
          title="How to use"
          description="Pick a template, drop in customer code or mock data, and capture diagnostics before sharing with the team.">
          <Text style={styles.bodyText}>
            - Keep changes self-contained within the template screen. {'\n'}-
            Use the Debug Panel (coming soon) to capture logs. {'\n'}- Reset the
            template when you are done to avoid polluting future sessions.
          </Text>
        </DemoSection>

        {cards.map(card => (
          <DemoSection
            key={card.route}
            title={card.title}
            description={card.description}>
            <ActionToolbar
              actions={[
                {
                  label: 'Open Screen',
                  onPress: () => navigation.navigate(card.route),
                  testID: `open-${card.route}`,
                },
              ]}
            />
          </DemoSection>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  headerTextWrapper: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 4,
    lineHeight: 18,
  },
  bodyText: {
    ...FONTS.body4,
    color: COLORS.black,
    lineHeight: 20,
  },
});

export default ReproLabHome;

