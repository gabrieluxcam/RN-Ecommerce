import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {
  DemoEnvironment,
  DemoFeatureFlags,
  DemoLogEvent,
  DemoNetworkSnapshot,
  useDemoActions,
  useDemoState,
} from '../state';

interface DebugPanelProps {
  visible: boolean;
  onClose: () => void;
}

const envOptions: DemoEnvironment[] = ['development', 'demo', 'production'];

const DebugPanel = ({visible, onClose}: DebugPanelProps) => {
  const state = useDemoState(s => s);
  const {setEnvironment, toggleFlag, clearLogEvents, clearNetworkHistory} =
    useDemoActions();

  const renderFlagRow = (flag: keyof DemoFeatureFlags, label: string) => (
    <View key={flag} style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={state.featureFlags[flag]}
        onValueChange={() => toggleFlag(flag)}
      />
    </View>
  );

  const renderLogRow = (log: DemoLogEvent) => (
    <View key={log.id} style={styles.logRow}>
      <Text style={styles.logScope}>{log.scope}</Text>
      <Text style={styles.logMessage} numberOfLines={2}>
        {log.message}
      </Text>
      <Text style={styles.logMeta}>
        {new Date(log.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  const renderNetworkRow = (entry: DemoNetworkSnapshot) => (
    <View key={entry.id} style={styles.networkRow}>
      <View style={styles.networkStatus}>
        <Text
          style={[
            styles.statusBadge,
            entry.success ? styles.statusSuccess : styles.statusDanger,
          ]}>
          {entry.status ?? '-'}
        </Text>
      </View>
      <View style={styles.networkCopy}>
        <Text style={styles.rowLabel} numberOfLines={1}>
          {entry.method} {entry.url}
        </Text>
        <Text style={styles.networkMeta}>
          {entry.durationMs ?? 0}ms ·{' '}
          {new Date(entry.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Debug Panel</Text>
              <Text style={styles.subtitle}>
                Inspect demo state, toggles, and diagnostics.
              </Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Environment</Text>
              <View style={styles.pillRow}>
                {envOptions.map(option => {
                  const active = option === state.environment;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.pill, active && styles.pillActive]}
                      onPress={() => setEnvironment(option)}>
                      <Text
                        style={[
                          styles.pillText,
                          active && styles.pillTextActive,
                        ]}>
                        {option.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Feature Flags</Text>
              {renderFlagRow('useMockData', 'Use mock data')}
              {renderFlagRow('showPerfOverlay', 'Show perf overlay')}
              {renderFlagRow('enableNetworkLogger', 'Enable network logger')}
              {renderFlagRow('logNavigation', 'Log navigation events')}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Logs</Text>
                <TouchableOpacity onPress={clearLogEvents}>
                  <Text style={styles.linkText}>Clear</Text>
                </TouchableOpacity>
              </View>
              {state.diagnostics.events.slice(0, 5).map(renderLogRow)}
              {!state.diagnostics.events.length && (
                <Text style={styles.emptyState}>
                  No events yet. Interact with the app to populate logs.
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Network History</Text>
                <TouchableOpacity onPress={clearNetworkHistory}>
                  <Text style={styles.linkText}>Clear</Text>
                </TouchableOpacity>
              </View>
              {state.diagnostics.networkHistory
                .slice(0, 5)
                .map(renderNetworkRow)}
              {!state.diagnostics.networkHistory.length && (
                <Text style={styles.emptyState}>
                  No network entries yet. Run the network sandbox to log calls.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray2,
  },
  closeText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  scroll: {
    maxHeight: '100%',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  pill: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  pillTextActive: {
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.lightGray,
  },
  rowLabel: {
    ...FONTS.body4,
    color: COLORS.black,
    flex: 1,
    marginRight: 16,
  },
  logRow: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.lightGray,
  },
  logScope: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  logMessage: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  logMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  networkStatus: {
    marginRight: 12,
  },
  statusBadge: {
    ...FONTS.body4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    color: COLORS.white,
  },
  statusSuccess: {
    backgroundColor: COLORS.success,
  },
  statusDanger: {
    backgroundColor: COLORS.danger,
  },
  networkCopy: {
    flex: 1,
  },
  networkMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  emptyState: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  linkText: {
    ...FONTS.body4,
    color: COLORS.secondary,
  },
});

export default DebugPanel;

