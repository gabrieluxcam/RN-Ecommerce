import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {ActionToolbar, DemoSection} from '../../src/components/repro';
import {useDemoLogger} from '../../src/state';

type BenchmarkResult = {
  id: string;
  label: string;
  duration: number;
  timestamp: number;
};

const PerformanceBenchScreen = () => {
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const logger = useDemoLogger('PerformanceBench');

  const addResult = (label: string, duration: number) => {
    const entry: BenchmarkResult = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      label,
      duration,
      timestamp: Date.now(),
    };
    setResults(prev => [entry, ...prev].slice(0, 15));
    logger.log('Benchmark completed', {label, duration});
  };

  const now = () => {
    const perf = (global as typeof globalThis & {
      performance?: {now: () => number};
    }).performance;
    return perf && typeof perf.now === 'function' ? perf.now() : Date.now();
  };

  const runBenchmark = (iterations: number, label: string) => {
    const start = now();
    let sum = 0;
    for (let i = 0; i < iterations; i += 1) {
      sum += Math.sqrt(i) * Math.random();
    }
    const end = now();
    addResult(label, Number((end - start).toFixed(2)));
    return sum;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <DemoSection
          title="Quick benchmarks"
          description="Run synthetic loops to compare baseline vs experimental changes.">
          <ActionToolbar
            actions={[
              {label: 'Baseline (50k)', onPress: () => runBenchmark(5e4, 'Baseline')},
              {label: 'Heavy (200k)', onPress: () => runBenchmark(2e5, 'Heavy load')},
              {label: 'Extreme (500k)', onPress: () => runBenchmark(5e5, 'Extreme load')},
              {label: 'Clear Results', onPress: () => setResults([])},
            ]}
          />
        </DemoSection>

        <DemoSection
          title="Results"
          description="Most recent runs listed first. Aim for consistent deltas when testing fixes.">
          {results.length === 0 && (
            <Text style={styles.emptyState}>
              No benchmarks yet. Use the toolbar above to start recording.
            </Text>
          )}
          {results.map(result => (
            <View key={result.id} style={styles.resultRow}>
              <View>
                <Text style={styles.resultLabel}>{result.label}</Text>
                <Text style={styles.resultMeta}>
                  {new Date(result.timestamp).toLocaleTimeString()}
                </Text>
              </View>
              <Text style={styles.resultValue}>{result.duration} ms</Text>
            </View>
          ))}
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
    paddingBottom: 40,
  },
  emptyState: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.lightGray,
  },
  resultLabel: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  resultMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  resultValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
});

export default PerformanceBenchScreen;

