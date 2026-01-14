/**
 * UXCam Configuration
 *
 * Configuration for UXCam SDK initialization.
 * API keys should be managed via environment variables in production.
 */

/**
 * Get UXCam configuration based on environment
 * @returns {Object} UXCam configuration object
 */
export const getUXCamConfig = () => {
  console.log('⚙️  [UXCam Config] Building configuration object...');
  console.log('🔍 [UXCam Config] Detecting environment...');
  console.log('   • __DEV__ flag:', __DEV__);
  console.log('   • Environment:', __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION');

  const config = {
    // App key provided for this project
    // userAppKey: 'hyglikxvm5sozzv',
    userAppKey: 'nthwtll5i43gqbt-us',

    // Manual screen tagging recommended for better control
    enableAutomaticScreenNameTagging: false,

    // Better recording quality
    enableImprovedScreenCapture: true,

    // Enable logs in development (only visible in Xcode/Android Studio)
    enableIntegrationLogging: true,
  };

  console.log('✅ [UXCam Config] Configuration built successfully');
  console.log('📋 [UXCam Config] Configuration summary:');
  console.log('   ├─ userAppKey:', config.userAppKey ? '✓ SET' : '✗ NOT SET');
  console.log(
    '   ├─ enableAutomaticScreenNameTagging:',
    config.enableAutomaticScreenNameTagging,
  );
  console.log(
    '   ├─ enableImprovedScreenCapture:',
    config.enableImprovedScreenCapture,
  );
  console.log(
    '   └─ enableIntegrationLogging:',
    config.enableIntegrationLogging,
  );
  console.log('');

  if (!config.userAppKey) {
    console.warn('⚠️  [UXCam Config] WARNING: No app key configured!');
    console.warn(
      '⚠️  [UXCam Config] UXCam will not function without a valid app key',
    );
  }

  if (config.enableAutomaticScreenNameTagging) {
    console.warn(
      '⚠️  [UXCam Config] WARNING: Automatic screen tagging is ENABLED',
    );
    console.warn(
      '⚠️  [UXCam Config] Manual tagging is recommended for better control',
    );
  }

  return config;
};
