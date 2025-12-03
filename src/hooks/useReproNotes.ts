import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDemoActions, useDemoState} from '../state';

const STORAGE_KEY = '@repro_lab_notes_v1';

export function useReproNotes() {
  const notes = useDemoState(state => state.reproNotes);
  const {setReproNotes} = useDemoActions();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const persisted = await AsyncStorage.getItem(STORAGE_KEY);
        if (persisted !== null && isMounted) {
          setReproNotes(persisted);
        }
      } catch (error) {
        console.warn('[ReproNotes] Failed to read from storage', error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [setReproNotes]);

  const updateNotes = useCallback(
    async (value: string) => {
      setReproNotes(value);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, value);
      } catch (error) {
        console.warn('[ReproNotes] Failed to persist notes', error);
      }
    },
    [setReproNotes],
  );

  const clearNotes = useCallback(async () => {
    setReproNotes('');
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('[ReproNotes] Failed to clear notes', error);
    }
  }, [setReproNotes]);

  return {notes, updateNotes, clearNotes};
}

