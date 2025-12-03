import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {ActionToolbar, DemoSection} from '../../src/components/repro';
import {useDemoActions, useDemoLogger, useDemoState, useNetworkLogger} from '../../src/state';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

const NetworkSandboxScreen = () => {
  const {networkSandbox, diagnostics} = useDemoState(state => ({
    networkSandbox: state.networkSandbox,
    diagnostics: state.diagnostics,
  }));
  const {setNetworkSandbox} = useDemoActions();
  const {record} = useNetworkLogger();
  const logger = useDemoLogger('NetworkSandbox');

  const [method, setMethod] = useState(HTTP_METHODS[0]);
  const [endpoint, setEndpoint] = useState('/demo');
  const [payload, setPayload] = useState('{"sample": true}');
  const [responseMode, setResponseMode] = useState<'success' | 'error'>('success');

  const simulateRequest = async () => {
    const url = `${networkSandbox.baseUrl}${endpoint}`;
    const requestId = `${Date.now()}`;
    logger.log('Simulating request', {method, url});
    const started = Date.now();

    await new Promise(resolve => setTimeout(resolve, 600));

    const success = responseMode === 'success';
    const status = success ? 200 : 500;
    const durationMs = Date.now() - started;
    const responseBody = success
      ? {ok: true, requestId}
      : {ok: false, error: 'Simulated failure', requestId};

    record({
      url,
      method,
      status,
      durationMs,
      success,
      timestamp: Date.now(),
      requestBody: payload ? JSON.parse(payload) : undefined,
      responseBody,
    });

    logger.log('Request finished', {success, status, durationMs});
  };

  const toggleResponseMode = () => {
    setResponseMode(prev => (prev === 'success' ? 'error' : 'success'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <DemoSection
          title="Configuration"
          description="Adjust base URL, HTTP verb, payload, and the simulated response.">
          <Text style={styles.label}>Base URL</Text>
          <TextInput
            style={styles.input}
            value={networkSandbox.baseUrl}
            onChangeText={value => setNetworkSandbox({baseUrl: value})}
          />
          <View style={styles.inlineInputs}>
            <View style={styles.inlineItem}>
              <Text style={styles.label}>Method</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.pillRow}>
                  {HTTP_METHODS.map(item => (
                    <Text
                      key={item}
                      style={[
                        styles.pill,
                        method === item && styles.pillActive,
                      ]}
                      onPress={() => setMethod(item)}>
                      {item}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={[styles.inlineItem, {flex: 2}]}>
              <Text style={styles.label}>Endpoint</Text>
              <TextInput
                style={styles.input}
                value={endpoint}
                onChangeText={setEndpoint}
              />
            </View>
          </View>

          <Text style={styles.label}>Payload (JSON)</Text>
          <TextInput
            style={[styles.input, styles.payloadInput]}
            multiline
            value={payload}
            onChangeText={setPayload}
          />
          <ActionToolbar
            actions={[
              {
                label:
                  responseMode === 'success'
                    ? 'Simulate Success'
                    : 'Simulate Failure',
                onPress: toggleResponseMode,
              },
              {label: 'Send Request', onPress: simulateRequest},
            ]}
          />
        </DemoSection>

        <DemoSection
          title="Recent history"
          description="Latest 5 simulated calls captured by the diagnostics store.">
          {diagnostics.networkHistory.slice(0, 5).map(entry => (
            <View key={entry.id} style={styles.historyRow}>
              <View style={styles.historyStatus}>
                <Text
                  style={[
                    styles.statusBadge,
                    entry.success ? styles.statusSuccess : styles.statusError,
                  ]}>
                  {entry.status ?? '-'}
                </Text>
              </View>
              <View style={styles.historyTextWrapper}>
                <Text style={styles.historyUrl} numberOfLines={1}>
                  {entry.method} {entry.url}
                </Text>
                <Text style={styles.historyMeta}>
                  {entry.durationMs ?? 0}ms ·{' '}
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))}
          {!diagnostics.networkHistory.length && (
            <Text style={styles.emptyState}>
              No entries yet. Run the simulation above to populate history.
            </Text>
          )}
        </DemoSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    ...FONTS.body4,
    color: COLORS.black,
    marginBottom: 12,
  },
  inlineInputs: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: -6,
  },
  inlineItem: {
    flex: 1,
    marginHorizontal: 6,
  },
  pillRow: {
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginRight: 8,
    ...FONTS.body4,
    color: COLORS.gray,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderColor: COLORS.primary,
  },
  payloadInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyStatus: {
    marginRight: 12,
  },
  statusBadge: {
    ...FONTS.body4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    color: COLORS.white,
    overflow: 'hidden',
  },
  statusSuccess: {
    backgroundColor: COLORS.success,
  },
  statusError: {
    backgroundColor: COLORS.danger,
  },
  historyTextWrapper: {
    flex: 1,
  },
  historyUrl: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  historyMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  emptyState: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
});

export default NetworkSandboxScreen;

