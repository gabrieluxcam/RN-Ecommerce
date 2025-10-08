import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const GesturesDemo = () => {
  const [tapCount, setTapCount] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('None');
  const [pinchScale, setPinchScale] = useState(1);

  // Shared values for animations
  const panTranslateX = useSharedValue(0);
  const panTranslateY = useSharedValue(0);
  const savedPanTranslateX = useSharedValue(0);
  const savedPanTranslateY = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Tap gesture
  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      runOnJS(setTapCount)(prev => prev + 1);
    });

  // Double tap gesture
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(scale.value === 1 ? 1.5 : 1);
    });

  // Pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      panTranslateX.value = savedPanTranslateX.value + e.translationX;
      panTranslateY.value = savedPanTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedPanTranslateX.value = panTranslateX.value;
      savedPanTranslateY.value = panTranslateY.value;
    });

  // Swipe gestures
  const swipeLeft = Gesture.Fling()
    .direction(Gesture.DIRECTION_LEFT)
    .onEnd(() => {
      runOnJS(setSwipeDirection)('Left');
    });

  const swipeRight = Gesture.Fling()
    .direction(Gesture.DIRECTION_RIGHT)
    .onEnd(() => {
      runOnJS(setSwipeDirection)('Right');
    });

  const swipeUp = Gesture.Fling()
    .direction(Gesture.DIRECTION_UP)
    .onEnd(() => {
      runOnJS(setSwipeDirection)('Up');
    });

  const swipeDown = Gesture.Fling()
    .direction(Gesture.DIRECTION_DOWN)
    .onEnd(() => {
      runOnJS(setSwipeDirection)('Down');
    });

  const swipeGesture = Gesture.Exclusive(
    swipeLeft,
    swipeRight,
    swipeUp,
    swipeDown
  );

  // Pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
      runOnJS(setPinchScale)(savedScale.value * e.scale);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // Animated styles
  const panAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: panTranslateX.value},
      {translateY: panTranslateY.value},
    ],
  }));

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="gesture-tap"
              size={40}
              color={COLORS.primary}
            />
            <Text style={styles.title}>Gestures Demo</Text>
            <Text style={styles.subtitle}>
              Explore gesture handling capabilities
            </Text>
          </View>

          {/* Tap Gesture */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tap Gesture</Text>
            <Text style={styles.description}>Tap the box below to count</Text>
            <GestureDetector gesture={tapGesture}>
              <View style={styles.demoArea}>
                <Animated.View style={styles.gestureBox}>
                  <MaterialCommunityIcons
                    name="gesture-tap"
                    size={30}
                    color={COLORS.white}
                  />
                  <Text style={styles.boxText}>Tap Me!</Text>
                  <Text style={styles.countText}>Taps: {tapCount}</Text>
                </Animated.View>
              </View>
            </GestureDetector>
          </View>

          {/* Double Tap Gesture */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Double Tap Gesture</Text>
            <Text style={styles.description}>
              Double tap to zoom in/out
            </Text>
            <GestureDetector gesture={doubleTapGesture}>
              <View style={styles.demoArea}>
                <Animated.View style={[styles.gestureBox, scaleAnimatedStyle, {backgroundColor: '#2196F3'}]}>
                  <MaterialCommunityIcons
                    name="gesture-double-tap"
                    size={30}
                    color={COLORS.white}
                  />
                  <Text style={styles.boxText}>Double Tap</Text>
                </Animated.View>
              </View>
            </GestureDetector>
          </View>

          {/* Pan Gesture */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pan Gesture</Text>
            <Text style={styles.description}>Drag the box around</Text>
            <GestureDetector gesture={panGesture}>
              <View style={styles.demoArea}>
                <Animated.View
                  style={[
                    styles.gestureBox,
                    panAnimatedStyle,
                    {backgroundColor: '#9C27B0'},
                  ]}>
                  <MaterialCommunityIcons
                    name="drag"
                    size={30}
                    color={COLORS.white}
                  />
                  <Text style={styles.boxText}>Drag Me!</Text>
                </Animated.View>
              </View>
            </GestureDetector>
          </View>

          {/* Swipe Gesture */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Swipe Gesture</Text>
            <Text style={styles.description}>
              Swipe in any direction
            </Text>
            <GestureDetector gesture={swipeGesture}>
              <View style={styles.demoArea}>
                <View style={[styles.gestureBox, {backgroundColor: '#FF9800'}]}>
                  <MaterialCommunityIcons
                    name="gesture-swipe"
                    size={30}
                    color={COLORS.white}
                  />
                  <Text style={styles.boxText}>Swipe!</Text>
                  <Text style={styles.countText}>
                    Direction: {swipeDirection}
                  </Text>
                </View>
              </View>
            </GestureDetector>
          </View>

          {/* Pinch Gesture */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pinch Gesture</Text>
            <Text style={styles.description}>
              Pinch to zoom (2 fingers required)
            </Text>
            <GestureDetector gesture={pinchGesture}>
              <View style={styles.demoArea}>
                <Animated.View
                  style={[
                    styles.gestureBox,
                    scaleAnimatedStyle,
                    {backgroundColor: '#4CAF50'},
                  ]}>
                  <MaterialCommunityIcons
                    name="gesture-pinch"
                    size={30}
                    color={COLORS.white}
                  />
                  <Text style={styles.boxText}>Pinch Me!</Text>
                  <Text style={styles.countText}>
                    Scale: {pinchScale.toFixed(2)}
                  </Text>
                </Animated.View>
              </View>
            </GestureDetector>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: 8,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 16,
  },
  demoArea: {
    height: 200,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureBox: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
    marginTop: 8,
  },
  countText: {
    color: COLORS.white,
    ...FONTS.body4,
    marginTop: 4,
  },
});

export default GesturesDemo;
