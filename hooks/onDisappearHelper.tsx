import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';

import RNUxcam from 'react-native-ux-cam';

export const useOnDisappear = () => {
  const navigation = useNavigation(); // Access navigation object
  const isFocusedRef = useRef(true); // Use ref to track focus state

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      isFocusedRef.current = false;
      console.log('Screen exited');
      RNUxcam.logEvent('Screen exited');

      if (RNUxcam.isRecording()) {
        RNUxcam.stopSessionAndUploadData();
      }
    });

    return () => unsubscribeBlur(); // Remove listener on cleanup
  }, [navigation]);

  useEffect(() => {
    if (!isFocusedRef.current) {
      // Additional actions when screen is not in focus
      // (e.g., cleanup, log additional data)
    }
  }, [isFocusedRef]);

  return {}; // Currently returns an empty object
};
