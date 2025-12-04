/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNUxcam from 'react-native-ux-cam';
import {getUXCamConfig} from './config/uxcam';

/**
 * Initialize UXCam for session recording and analytics
 * Must be called before AppRegistry.registerComponent
 */
function initializeUXCam() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║         UXCam INITIALIZATION STARTING                ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log('⏰ [UXCam Init] Timestamp:', new Date().toISOString());
  console.log('📍 [UXCam Init] Location: index.js');
  console.log('───────────────────────────────────────────────────────\n');

  try {
    // Step 1: Opt into schematic recordings
    console.log(
      '🎬 [UXCam Init] STEP 1/3: Opting into schematic recordings...',
    );
    console.log(
      '🚀 [UXCam Init] Calling RNUxcam.optIntoSchematicRecordings()...',
    );
    RNUxcam.optIntoSchematicRecordings();
    console.log('✅ [UXCam Init] Schematic recordings enabled successfully\n');

    // Step 2: Get configuration
    console.log('⚙️  [UXCam Init] STEP 2/3: Loading configuration...');
    console.log('🚀 [UXCam Init] Calling getUXCamConfig()...');
    const config = getUXCamConfig();
    console.log('✅ [UXCam Init] Configuration loaded successfully');
    console.log('📋 [UXCam Init] Config details:');
    console.log(
      '   • App Key:',
      config.userAppKey ? `${config.userAppKey.substring(0, 8)}...` : 'NOT SET',
    );
    console.log(
      '   • Auto Screen Tagging:',
      config.enableAutomaticScreenNameTagging,
    );
    console.log(
      '   • Improved Screen Capture:',
      config.enableImprovedScreenCapture,
    );
    console.log('   • Integration Logging:', config.enableIntegrationLogging);
    console.log('');

    // Step 3: Start with configuration
    console.log(
      '🚀 [UXCam Init] STEP 3/3: Starting UXCam with configuration...',
    );
    console.log(
      '🚀 [UXCam Init] Calling RNUxcam.startWithConfiguration(config)...',
    );
    RNUxcam.startWithConfiguration(config);
    console.log('✅ [UXCam Init] UXCam SDK started successfully\n');

    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║    ✅ UXCAM INITIALIZATION COMPLETED SUCCESSFULLY    ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log('🎉 [UXCam Init] UXCam is now recording sessions');
    console.log('📱 [UXCam Init] Screen tagging will occur on navigation');
    console.log(
      '🔒 [UXCam Init] Session data will upload when app backgrounds\n',
    );
  } catch (error) {
    console.error(
      '\n╔═══════════════════════════════════════════════════════╗',
    );
    console.error('║      ❌ UXCAM INITIALIZATION FAILED                  ║');
    console.error('╚═══════════════════════════════════════════════════════╝');
    console.error('💥 [UXCam Init] Error caught during initialization');
    console.error('📋 [UXCam Init] Error type:', error?.constructor?.name);
    console.error('📋 [UXCam Init] Error message:', error?.message);
    console.error('📋 [UXCam Init] Error details:', error);
    console.error('📋 [UXCam Init] Error stack trace:');
    console.error(error?.stack);
    console.error(
      '⚠️  [UXCam Init] UXCam will not record sessions for this session\n',
    );
  }
}

// Initialize UXCam before registering the app
console.log('🎬 [App Entry] Starting UXCam initialization...');
initializeUXCam();
console.log('🎬 [App Entry] Proceeding to register app component...\n');

AppRegistry.registerComponent(appName, () => App);
