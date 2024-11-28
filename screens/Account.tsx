import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../src/types/NavigationTypes'; // Adjust the import path as needed
import RNUxcam from 'react-native-ux-cam';
import {OcclusionType} from 'react-native-ux-cam/src/types';

import {useFocusEffect} from '@react-navigation/native';

// Payment sheet mockup functions
const initializePaymentSheet = async () => {
  console.log('Initializing payment sheet...');
  // Mockup: Simulate payment sheet initialization
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const openPaymentSheet = async (setPaymentSheetVisible: {
  (value: React.SetStateAction<boolean>): void;
  (arg0: boolean): void;
}) => {
  console.log('Opening payment sheet...');
  // Mockup: Simulate opening the payment sheet
  await initializePaymentSheet();
  setPaymentSheetVisible(true);
};

type AccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebViewScreen'
>;

export default function Account() {
  const [isPaymentSheetVisible, setPaymentSheetVisible] = useState(false);

  const overlay = {
    type: 2, // compulsory to determine overlay type
  };

  useFocusEffect(() => {
    RNUxcam.tagScreenName('Testing Screen');
    RNUxcam.allowShortBreakForAnotherApp(false);
  });

  useEffect(() => {
    if (!isPaymentSheetVisible) {
      RNUxcam.removeOcclusion(overlay);
    }
  }, [isPaymentSheetVisible]);

  const navigation = useNavigation<AccountScreenNavigationProp>();

  function handlePress(buttonName: string) {
    console.log('====================================');
    console.log(`${buttonName} Pressed!`);
    console.log('====================================');
    if (buttonName === 'Test1') {
      navigation.navigate('WebViewScreen');
    }
  }

  const handlePaymentSheet = async () => {
    RNUxcam.applyOcclusion(overlay);
    await openPaymentSheet(setPaymentSheetVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Webview"
          onPress={() => handlePress('Test1')}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Allow Short BReak"
          onPress={() => RNUxcam.allowShortBreakForAnotherApp(true)}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Payment Sheet"
          onPress={handlePaymentSheet}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Test4"
          onPress={() => handlePress('Test4')}
          color="#00008B"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Test5"
          onPress={() => handlePress('Test5')}
          color="#00008B"
        />
      </View>

      <Modal
        visible={isPaymentSheetVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPaymentSheetVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.paymentSheet}>
            <Text style={styles.sheetTitle}>Payment Sheet</Text>
            <Text>Enter your payment details below:</Text>
            <View style={styles.mockInput}>
              <Text>Card Number</Text>
            </View>
            <View style={styles.mockInput}>
              <Text>Expiry Date</Text>
            </View>
            <View style={styles.mockInput}>
              <Text>CVV</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPaymentSheetVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paymentSheet: {
    height: '66%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mockInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#00008B',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
