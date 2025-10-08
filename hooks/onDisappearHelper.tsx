import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';

export const useOnDisappear = () => {
  const navigation = useNavigation(); // Access navigation object
  const isFocusedRef = useRef(true); // Use ref to track focus state

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      isFocusedRef.current = false;
      console.log('Screen exited');
    });

    return () => unsubscribeBlur(); // Remove listener on cleanup
  }, [navigation]);

  useEffect(() => {
    if (!isFocusedRef.current) {
      // Additional actions when screen is not in focus
      // (e.g., cleanup, log additional data)
    }
  }, []);

  return {}; // Currently returns an empty object
};
