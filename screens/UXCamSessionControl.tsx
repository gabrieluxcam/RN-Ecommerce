/**
 * UXCam Session Control Test Page
 * 
 * Manual testing interface for UXCam session management.
 * Provides buttons to control recording state with comprehensive logging.
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import RNUxcam from 'react-native-ux-cam';

interface SessionStatus {
  isRecording: boolean;
  timestamp: string;
  action: string;
}

export default function UXCamSessionControl() {
  const [statusHistory, setStatusHistory] = useState<SessionStatus[]>([]);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);

  useEffect(() => {
    // Check initial status
    checkRecordingStatus('Component Mounted');
  }, []);

  /**
   * Check and log current recording status
   */
  const checkRecordingStatus = (action: string) => {
    console.log('\n🔍 [Session Control] ═══ CHECKING RECORDING STATUS ═══');
    console.log('⏰ [Session Control] Timestamp:', new Date().toISOString());
    console.log('🎬 [Session Control] Action:', action);
    console.log('🚀 [Session Control] Calling RNUxcam.isRecording()...');

    try {
      const isRecording = RNUxcam.isRecording();
      const status = {
        isRecording,
        timestamp: new Date().toLocaleTimeString(),
        action,
      };

      console.log('✅ [Session Control] Recording status retrieved');
      console.log('📊 [Session Control] Is Recording:', isRecording);
      console.log('🔍 [Session Control] ═══ CHECK COMPLETE ═══\n');

      setCurrentStatus(isRecording);
      setStatusHistory(prev => [status, ...prev.slice(0, 9)]); // Keep last 10

      return isRecording;
    } catch (error) {
      console.error('❌ [Session Control] Error checking status:', error);
      Alert.alert('Error', 'Failed to check recording status');
      return false;
    }
  };

  /**
   * Stop session and upload data
   */
  const handleStopSession = async () => {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║     STOP SESSION AND UPLOAD DATA                     ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log('⏰ [Session Control] Timestamp:', new Date().toISOString());

    // Check status before stopping
    console.log('\n📋 [Session Control] STEP 1: Check status BEFORE stop');
    const wasRecording = checkRecordingStatus('Before Stop');

    if (!wasRecording) {
      console.warn('⚠️  [Session Control] WARNING: Not currently recording!');
      Alert.alert(
        'Not Recording',
        'UXCam is not currently recording. There is no active session to stop.',
        [{text: 'OK'}],
      );
      return;
    }

    try {
      // Stop and upload
      console.log('\n📋 [Session Control] STEP 2: Stopping session...');
      console.log('🚀 [Session Control] Calling RNUxcam.stopSessionAndUploadData()...');
      RNUxcam.stopSessionAndUploadData();
      console.log('✅ [Session Control] Stop command sent successfully');

      // Wait a bit for the stop to process
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check status after stopping
      console.log('\n📋 [Session Control] STEP 3: Check status AFTER stop');
      const isRecording = checkRecordingStatus('After Stop');

      console.log('\n╔═══════════════════════════════════════════════════════╗');
      console.log('║     STOP SESSION COMPLETE                            ║');
      console.log('╚═══════════════════════════════════════════════════════╝');
      console.log('📊 [Session Control] Was Recording:', wasRecording);
      console.log('📊 [Session Control] Now Recording:', isRecording);
      console.log('📤 [Session Control] Session data is uploading to UXCam');
      console.log('🔄 [Session Control] New session will start when app resumes\n');

      Alert.alert(
        'Session Stopped',
        `Previous Status: ${wasRecording ? 'Recording ✅' : 'Not Recording ❌'}\n` +
          `Current Status: ${isRecording ? 'Recording ✅' : 'Not Recording ❌'}\n\n` +
          'Session data is being uploaded to UXCam dashboard.',
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error('❌ [Session Control] Error stopping session:', error);
      Alert.alert('Error', 'Failed to stop session: ' + error);
    }
  };

  /**
   * Start a new session
   */
  const handleStartNewSession = async () => {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║     START NEW SESSION                                ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log('⏰ [Session Control] Timestamp:', new Date().toISOString());

    // Check status before starting
    console.log('\n📋 [Session Control] STEP 1: Check status BEFORE start');
    const wasRecording = checkRecordingStatus('Before Start');

    if (wasRecording) {
      console.warn('⚠️  [Session Control] WARNING: Already recording!');
      Alert.alert(
        'Already Recording',
        'UXCam is already recording. Stop the current session first if you want to start a fresh one.',
        [{text: 'OK'}],
      );
      return;
    }

    try {
      // Start new session
      console.log('\n📋 [Session Control] STEP 2: Starting new session...');
      console.log('🚀 [Session Control] Calling RNUxcam.startNewSession()...');
      RNUxcam.startNewSession();
      console.log('✅ [Session Control] Start command sent successfully');

      // Wait a bit for the start to process
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check status after starting
      console.log('\n📋 [Session Control] STEP 3: Check status AFTER start');
      const isRecording = checkRecordingStatus('After Start');

      console.log('\n╔═══════════════════════════════════════════════════════╗');
      console.log('║     START SESSION COMPLETE                           ║');
      console.log('╚═══════════════════════════════════════════════════════╝');
      console.log('📊 [Session Control] Was Recording:', wasRecording);
      console.log('📊 [Session Control] Now Recording:', isRecording);
      console.log('🎉 [Session Control] New session started successfully\n');

      Alert.alert(
        'Session Started',
        `Previous Status: ${wasRecording ? 'Recording ✅' : 'Not Recording ❌'}\n` +
          `Current Status: ${isRecording ? 'Recording ✅' : 'Not Recording ❌'}\n\n` +
          'A new UXCam session has been started.',
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error('❌ [Session Control] Error starting session:', error);
      Alert.alert('Error', 'Failed to start session: ' + error);
    }
  };

  /**
   * Force refresh status
   */
  const handleRefreshStatus = () => {
    checkRecordingStatus('Manual Refresh');
    Alert.alert(
      'Status Refreshed',
      `Current Status: ${currentStatus ? 'Recording ✅' : 'Not Recording ❌'}`,
      [{text: 'OK'}],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎬 UXCam Session Control</Text>
        <Text style={styles.subtitle}>Manual Session Management Test</Text>
      </View>

      {/* Current Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Current Recording Status:</Text>
        <View
          style={[
            styles.statusBadge,
            currentStatus ? styles.statusRecording : styles.statusNotRecording,
          ]}>
          <Text style={styles.statusText}>
            {currentStatus ? '🔴 RECORDING' : '⚫ NOT RECORDING'}
          </Text>
        </View>
        <Text style={styles.statusTime}>
          Last checked: {statusHistory[0]?.timestamp || 'Never'}
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsSection}>
        <Text style={styles.sectionTitle}>Session Controls</Text>

        {/* Refresh Status Button */}
        <TouchableOpacity
          style={[styles.button, styles.buttonInfo]}
          onPress={handleRefreshStatus}>
          <Text style={styles.buttonText}>🔍 Check Recording Status</Text>
          <Text style={styles.buttonSubtext}>Query isRecording()</Text>
        </TouchableOpacity>

        {/* Stop Session Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonDanger,
            !currentStatus && styles.buttonDisabled,
          ]}
          onPress={handleStopSession}
          disabled={!currentStatus}>
          <Text style={styles.buttonText}>⏹️ Stop Session & Upload</Text>
          <Text style={styles.buttonSubtext}>
            stopSessionAndUploadData()
            {!currentStatus && ' (No active session)'}
          </Text>
        </TouchableOpacity>

        {/* Start Session Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonSuccess,
            currentStatus && styles.buttonDisabled,
          ]}
          onPress={handleStartNewSession}
          disabled={currentStatus}>
          <Text style={styles.buttonText}>▶️ Start New Session</Text>
          <Text style={styles.buttonSubtext}>
            startNewSession()
            {currentStatus && ' (Already recording)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Status History</Text>
        {statusHistory.length === 0 ? (
          <Text style={styles.emptyText}>No history yet</Text>
        ) : (
          statusHistory.map((status, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyHeader}>
                <Text
                  style={[
                    styles.historyStatus,
                    status.isRecording
                      ? styles.historyRecording
                      : styles.historyNotRecording,
                  ]}>
                  {status.isRecording ? '🔴 Recording' : '⚫ Not Recording'}
                </Text>
                <Text style={styles.historyTime}>{status.timestamp}</Text>
              </View>
              <Text style={styles.historyAction}>{status.action}</Text>
            </View>
          ))
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructionsSection}>
        <Text style={styles.sectionTitle}>📝 Instructions</Text>
        <Text style={styles.instructionText}>
          1. <Text style={styles.bold}>Check Status:</Text> Query current
          recording state
        </Text>
        <Text style={styles.instructionText}>
          2. <Text style={styles.bold}>Stop Session:</Text> End current session
          and upload data (only when recording)
        </Text>
        <Text style={styles.instructionText}>
          3. <Text style={styles.bold}>Start Session:</Text> Begin new session
          (only when not recording)
        </Text>
        <Text style={styles.instructionText}>
          {'\n'}💡 <Text style={styles.bold}>Tip:</Text> Check the console logs
          for detailed information about each action!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  statusCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusRecording: {
    backgroundColor: '#ff1744',
  },
  statusNotRecording: {
    backgroundColor: '#666',
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusTime: {
    fontSize: 12,
    color: '#999',
  },
  controlsSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonInfo: {
    backgroundColor: '#2196f3',
  },
  buttonDanger: {
    backgroundColor: '#ff1744',
  },
  buttonSuccess: {
    backgroundColor: '#00c853',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  historySection: {
    margin: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    padding: 20,
  },
  historyItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#2196f3',
    paddingLeft: 10,
    marginBottom: 12,
    paddingVertical: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyRecording: {
    color: '#ff1744',
  },
  historyNotRecording: {
    color: '#666',
  },
  historyTime: {
    fontSize: 12,
    color: '#999',
  },
  historyAction: {
    fontSize: 12,
    color: '#666',
  },
  instructionsSection: {
    margin: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

