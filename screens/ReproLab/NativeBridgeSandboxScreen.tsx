import React, {useState} from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {ActionToolbar, DemoSection} from '../../src/components/repro';
import {useDemoLogger} from '../../src/state';

const PLACEHOLDER_MODULE = 'DemoNativeBridge';

const NativeBridgeSandboxScreen = () => {
  const logger = useDemoLogger('NativeBridge');
  const [result, setResult] = useState<string | null>(null);
  const bridge = NativeModules[PLACEHOLDER_MODULE];

  const invokeMethod = async (methodName: string) => {
    if (!bridge || typeof bridge[methodName] !== 'function') {
      setResult('Module or method not available. Implement natively first.');
      logger.log('Method missing', {methodName});
      return;
    }
    try {
      const value = await bridge[methodName]();
      setResult(JSON.stringify(value));
      logger.log('Method resolved', {methodName});
    } catch (error) {
      setResult(`Error: ${(error as Error).message}`);
      logger.log('Method rejected', {methodName});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <DemoSection
          title="Module wiring checklist"
          description={`Create a native module named "${PLACEHOLDER_MODULE}" and expose it to React Native.`}>
          <Text style={styles.listItem}>
            1. Add the module on {Platform.OS === 'ios' ? 'iOS (Obj-C/Swift)' : 'Android (Kotlin/Java)'} with at least two methods.
          </Text>
          <Text style={styles.listItem}>
            2. Update the TypeScript declaration under `src/types/native.d.ts`.
          </Text>
          <Text style={styles.listItem}>
            3. Hot reload this screen and use the toolbar to exercise the bridge.
          </Text>
        </DemoSection>

        <DemoSection
          title="Available modules"
          description="Use this list to double-check that Metro sees your native exports.">
          {Object.keys(NativeModules).slice(0, 20).map(name => (
            <Text key={name} style={styles.moduleName}>
              • {name}
            </Text>
          ))}
        </DemoSection>

        <DemoSection
          title="Invoke placeholder module"
          description={
            bridge
              ? 'Tap one of the buttons below to exercise your native code.'
              : 'Module not yet available. Use this space to stub responses while working with native teammates.'
          }>
          <ActionToolbar
            actions={[
              {
                label: 'callSuccess()',
                onPress: () => invokeMethod('callSuccess'),
                disabled: !bridge,
              },
              {
                label: 'callFailure()',
                onPress: () => invokeMethod('callFailure'),
                disabled: !bridge,
              },
            ]}
          />
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Result</Text>
            <Text style={styles.resultText}>
              {result ?? 'Awaiting invocation…'}
            </Text>
          </View>
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
  listItem: {
    ...FONTS.body4,
    color: COLORS.black,
    marginBottom: 8,
  },
  moduleName: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    backgroundColor: COLORS.white,
  },
  resultLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 4,
  },
  resultText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
});

export default NativeBridgeSandboxScreen;

