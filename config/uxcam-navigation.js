/**
 * UXCam Navigation Helper
 *
 * Utilities for tracking React Navigation screen changes with UXCam.
 * This automatically tags screens as users navigate through the app.
 */

import RNUxcam from 'react-native-ux-cam';

/**
 * Get the active route name from navigation state
 * Handles nested navigators (tabs, stacks, drawers)
 *
 * @param {Object} state - Navigation state object
 * @returns {string|undefined} - Current screen name
 */
export function getActiveRouteName(state) {
  console.log(
    '🔍 [UXCam Navigation] Extracting active route name from state...',
  );

  if (!state || typeof state.index !== 'number') {
    console.log(
      '⚠️  [UXCam Navigation] No valid state found, returning undefined',
    );
    return undefined;
  }

  const route = state.routes[state.index];
  console.log(
    `🔍 [UXCam Navigation] Current route at index ${state.index}:`,
    route.name,
  );

  // Dive into nested navigators
  if (route.state) {
    console.log(
      `🔄 [UXCam Navigation] Found nested navigator in "${route.name}", diving deeper...`,
    );
    return getActiveRouteName(route.state);
  }

  console.log(`✅ [UXCam Navigation] Final active route: "${route.name}"`);
  return route.name;
}

/**
 * Tag screen name with UXCam
 *
 * @param {string} screenName - Name of the screen to tag
 */
export function tagScreen(screenName) {
  if (!screenName) {
    console.log('⚠️  [UXCam Screen Tag] No screen name provided, skipping tag');
    return;
  }

  console.log('═══════════════════════════════════════════════════════');
  console.log(`📱 [UXCam Screen Tag] PREPARING TO TAG SCREEN: "${screenName}"`);
  console.log(`⏰ [UXCam Screen Tag] Timestamp: ${new Date().toISOString()}`);
  console.log('───────────────────────────────────────────────────────');

  try {
    console.log(
      `🚀 [UXCam Screen Tag] Calling RNUxcam.tagScreenName("${screenName}")...`,
    );
    RNUxcam.tagScreenName(screenName);
    console.log(
      `✅ [UXCam Screen Tag] SUCCESS - Screen "${screenName}" tagged successfully`,
    );
    console.log('═══════════════════════════════════════════════════════\n');
  } catch (error) {
    console.error('═══════════════════════════════════════════════════════');
    console.error(
      `❌ [UXCam Screen Tag] FAILED - Error tagging screen "${screenName}"`,
    );
    console.error('📋 [UXCam Screen Tag] Error details:', error);
    console.error('📋 [UXCam Screen Tag] Error message:', error?.message);
    console.error('📋 [UXCam Screen Tag] Error stack:', error?.stack);
    console.error('═══════════════════════════════════════════════════════\n');
  }
}

/**
 * Create navigation state change listener for UXCam
 * Use this in NavigationContainer's onStateChange prop
 *
 * @returns {Function} Navigation state change handler
 */
export function createNavigationStateChangeHandler() {
  let previousScreenName;
  console.log('🎯 [UXCam Navigation] Navigation state change handler created');

  return state => {
    console.log('\n🔔 [UXCam Navigation] ═══ NAVIGATION STATE CHANGED ═══');
    console.log('📊 [UXCam Navigation] Navigation state update received');
    console.log('⏰ [UXCam Navigation] Timestamp:', new Date().toISOString());

    const currentScreenName = getActiveRouteName(state);

    console.log(
      '📌 [UXCam Navigation] Previous screen:',
      previousScreenName || '(none)',
    );
    console.log(
      '📌 [UXCam Navigation] Current screen:',
      currentScreenName || '(none)',
    );

    // Only tag if screen changed
    if (currentScreenName && currentScreenName !== previousScreenName) {
      console.log(
        '✨ [UXCam Navigation] Screen change detected! Proceeding to tag...',
      );
      tagScreen(currentScreenName);
      previousScreenName = currentScreenName;
      console.log('💾 [UXCam Navigation] Previous screen name updated');
    } else if (currentScreenName === previousScreenName) {
      console.log('⏭️  [UXCam Navigation] Same screen, skipping tag');
    } else {
      console.log('⚠️  [UXCam Navigation] No valid screen name, skipping tag');
    }

    console.log('🔔 [UXCam Navigation] ═══ STATE CHANGE COMPLETE ═══\n');
  };
}
