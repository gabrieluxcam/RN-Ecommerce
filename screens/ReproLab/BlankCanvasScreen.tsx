import React, {useEffect, useState} from 'react';
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
import {useDemoLogger} from '../../src/state';
import {useReproNotes} from '../../src/hooks/useReproNotes';

const BlankCanvasScreen = () => {
  const {notes, updateNotes, clearNotes} = useReproNotes();
  const [draft, setDraft] = useState(notes);
  const logger = useDemoLogger('BlankCanvas');

  useEffect(() => {
    setDraft(notes);
  }, [notes]);

  const handleSaveNotes = async () => {
    await updateNotes(draft);
    logger.log('Saved repro notes', {length: draft.length});
  };

  const handleClearNotes = async () => {
    await clearNotes();
    logger.log('Cleared repro notes');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <DemoSection
          title="Canvas overview"
          description="Drop in any custom UI or hooks here. Use the toolbar below to manage quick actions.">
          <ActionToolbar
            actions={[
              {label: 'Log Marker', onPress: () => logger.log('Marker added')},
              {label: 'Reset Notes', onPress: handleClearNotes},
            ]}
          />
        </DemoSection>

        <DemoSection
          title="Reproduction notes"
          description="Document exact steps, environment tweaks, or snippets you added.">
          <TextInput
            style={styles.notesInput}
            multiline
            numberOfLines={6}
            value={draft}
            onChangeText={setDraft}
            placeholder="Paste steps, console output, etc."
            placeholderTextColor={COLORS.gray}
            accessibilityLabel="Reproduction notes"
          />
          <ActionToolbar
            actions={[
              {label: 'Save Notes', onPress: handleSaveNotes},
              {label: 'Clear Notes', onPress: handleClearNotes},
            ]}
          />
        </DemoSection>

        <View style={styles.placeholderArea}>
          <Text style={styles.placeholderText}>
            Your custom components go here. Consider wrapping experiments with a
            boundary component so they can be toggled on/off quickly.
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
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    minHeight: 140,
    ...FONTS.body4,
    color: COLORS.black,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  placeholderArea: {
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: 12,
    padding: 24,
    marginTop: 8,
  },
  placeholderText: {
    ...FONTS.body4,
    color: COLORS.gray,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default BlankCanvasScreen;

