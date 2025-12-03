import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {ActionToolbar, DemoSection} from '../../src/components/repro';
import {useDemoLogger} from '../../src/state';

type Block = {
  id: string;
  weight: number;
};

const generateBlock = (): Block => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  weight: Math.random() * 2 + 0.5,
});

const LayoutStressScreen = () => {
  const [blocks, setBlocks] = useState<Block[]>(() =>
    Array.from({length: 6}, () => generateBlock()),
  );
  const [wrap, setWrap] = useState(true);
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const logger = useDemoLogger('LayoutStress');

  const totalWeight = useMemo(
    () => blocks.reduce((sum, block) => sum + block.weight, 0),
    [blocks],
  );

  const addBlocks = (count: number) => {
    setBlocks(prev => [...prev, ...Array.from({length: count}, generateBlock)]);
    logger.log('Blocks added', {count});
  };

  const clearBlocks = () => {
    setBlocks([]);
    logger.log('Blocks cleared');
  };

  const toggleWrap = () => {
    setWrap(prev => !prev);
  };

  const toggleDirection = () => {
    setDirection(prev => (prev === 'row' ? 'column' : 'row'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <DemoSection
          title="Layout stressor"
          description="Dial up the number of blocks to replicate heavy layout scenarios.">
          <ActionToolbar
            actions={[
              {label: '+5 Blocks', onPress: () => addBlocks(5)},
              {label: '+25 Blocks', onPress: () => addBlocks(25)},
              {label: 'Toggle Wrap', onPress: toggleWrap},
              {label: 'Toggle Direction', onPress: toggleDirection},
              {label: 'Clear', onPress: clearBlocks},
            ]}
          />
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Blocks: {blocks.length}</Text>
            <Text style={styles.metaText}>
              Total Weight: {totalWeight.toFixed(2)}
            </Text>
            <Text style={styles.metaText}>
              Layout: {direction} {wrap ? '(wrap)' : '(nowrap)'}
            </Text>
          </View>
        </DemoSection>

        <View
          style={[
            styles.canvas,
            {
              flexDirection: direction,
              flexWrap: wrap ? 'wrap' : 'nowrap',
            },
          ]}>
          {blocks.map(block => (
            <View
              key={block.id}
              style={[
                styles.block,
                {
                  flexGrow: block.weight,
                  flexBasis: direction === 'row' ? '30%' : undefined,
                  height: direction === 'column' ? 60 * block.weight : 80,
                },
              ]}>
              <Text style={styles.blockText}>{block.weight.toFixed(1)}</Text>
            </View>
          ))}
          {!blocks.length && (
            <Text style={styles.emptyText}>
              No blocks yet. Use the toolbar above to generate layout stress.
            </Text>
          )}
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
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  metaText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginRight: 16,
  },
  canvas: {
    minHeight: SIZES.height * 0.4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS.white,
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  blockText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  emptyText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
});

export default LayoutStressScreen;

