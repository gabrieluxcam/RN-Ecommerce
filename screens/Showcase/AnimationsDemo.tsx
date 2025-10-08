import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
  interpolateColor,
  withDelay,
} from 'react-native-reanimated';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimationsDemo = () => {
  // Shared values for animations
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const bounce = useSharedValue(0);
  const shake = useSharedValue(0);
  const flip = useSharedValue(0);
  const pulse = useSharedValue(1);
  const colorProgress = useSharedValue(0);

  // Animated styles
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{translateY: bounce.value}],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shake.value}],
  }));

  const flipStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {rotateY: `${flip.value}deg`},
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{scale: pulse.value}],
    opacity: interpolate(pulse.value, [1, 1.3], [1, 0.7]),
  }));

  const colorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 0.5, 1],
      ['#E91E63', '#2196F3', '#4CAF50']
    ),
  }));

  // Animation functions
  const handleScale = () => {
    scale.value = withSequence(
      withSpring(1.5, {damping: 2, stiffness: 100}),
      withSpring(1, {damping: 3, stiffness: 150})
    );
  };

  const handleFade = () => {
    opacity.value = withSequence(
      withTiming(0, {duration: 400}),
      withTiming(1, {duration: 400})
    );
  };

  const handleRotate = () => {
    rotation.value = withTiming(rotation.value + 360, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handleSlide = () => {
    translateX.value = withSequence(
      withSpring(120, {damping: 8, stiffness: 100}),
      withSpring(0, {damping: 8, stiffness: 100})
    );
  };

  const handleBounce = () => {
    bounce.value = withSequence(
      withTiming(-20, {duration: 100}),
      withTiming(0, {duration: 100}),
      withTiming(-15, {duration: 100}),
      withTiming(0, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(0, {duration: 100})
    );
  };

  const handleShake = () => {
    shake.value = withSequence(
      withTiming(-15, {duration: 50}),
      withRepeat(withTiming(15, {duration: 100}), 5, true),
      withTiming(0, {duration: 50})
    );
  };

  const handleFlip = () => {
    flip.value = withTiming(flip.value + 180, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handlePulse = () => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.3, {duration: 500}),
        withTiming(1, {duration: 500})
      ),
      3,
      false
    );
  };

  const handleColorChange = () => {
    colorProgress.value = withSequence(
      withTiming(1, {duration: 1500}),
      withTiming(0, {duration: 1500})
    );
  };

  const startContinuous = () => {
    rotation.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1
    );
  };

  const stopContinuous = () => {
    rotation.value = withTiming(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="animation-play"
            size={40}
            color={COLORS.primary}
          />
          <Text style={styles.title}>Animations Demo</Text>
          <Text style={styles.subtitle}>
            Explore React Native Reanimated animations
          </Text>
        </View>

        {/* Scale Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scale Animation</Text>
          <Text style={styles.description}>
            Spring-based scaling animation with bounce effect
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, scaleStyle]}>
              <MaterialCommunityIcons
                name="arrow-expand-all"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleScale}>
            <Text style={styles.buttonText}>Animate Scale</Text>
          </TouchableOpacity>
        </View>

        {/* Fade Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fade Animation</Text>
          <Text style={styles.description}>
            Smooth opacity transition with timing function
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.fadeBox, fadeStyle]}>
              <MaterialCommunityIcons
                name="eye-outline"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleFade}>
            <Text style={styles.buttonText}>Animate Fade</Text>
          </TouchableOpacity>
        </View>

        {/* Rotation Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rotation Animation</Text>
          <Text style={styles.description}>
            360-degree rotation with easing curve
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.rotateBox, rotateStyle]}>
              <MaterialCommunityIcons
                name="sync"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleRotate}>
              <Text style={styles.buttonText}>Rotate Once</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={startContinuous}>
              <Text style={styles.buttonText}>Start Loop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.dangerButton]}
              onPress={stopContinuous}>
              <Text style={styles.buttonText}>Stop Loop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Slide Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Slide Animation</Text>
          <Text style={styles.description}>
            Horizontal translation with spring physics
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.slideBox, slideStyle]}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSlide}>
            <Text style={styles.buttonText}>Animate Slide</Text>
          </TouchableOpacity>
        </View>

        {/* Bounce Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bounce Animation</Text>
          <Text style={styles.description}>
            Vertical bouncing with decreasing intensity
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.bounceBox, bounceStyle]}>
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleBounce}>
            <Text style={styles.buttonText}>Animate Bounce</Text>
          </TouchableOpacity>
        </View>

        {/* Shake Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shake Animation</Text>
          <Text style={styles.description}>
            Rapid horizontal shake - perfect for errors or alerts
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.shakeBox, shakeStyle]}>
              <MaterialCommunityIcons
                name="bell-alert"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleShake}>
            <Text style={styles.buttonText}>Animate Shake</Text>
          </TouchableOpacity>
        </View>

        {/* Flip Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flip Animation</Text>
          <Text style={styles.description}>
            3D flip effect with perspective transformation
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.flipBox, flipStyle]}>
              <MaterialCommunityIcons
                name="rotate-3d-variant"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleFlip}>
            <Text style={styles.buttonText}>Animate Flip</Text>
          </TouchableOpacity>
        </View>

        {/* Pulse Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pulse Animation</Text>
          <Text style={styles.description}>
            Pulsing scale with opacity change - great for notifications
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, styles.pulseBox, pulseStyle]}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePulse}>
            <Text style={styles.buttonText}>Animate Pulse</Text>
          </TouchableOpacity>
        </View>

        {/* Color Change Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Transition</Text>
          <Text style={styles.description}>
            Smooth color interpolation between multiple colors
          </Text>
          <View style={styles.demoArea}>
            <Animated.View style={[styles.box, colorStyle]}>
              <MaterialCommunityIcons
                name="palette"
                size={30}
                color={COLORS.white}
              />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleColorChange}>
            <Text style={styles.buttonText}>Animate Color</Text>
          </TouchableOpacity>
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
    height: 150,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeBox: {
    backgroundColor: '#2196F3',
  },
  rotateBox: {
    backgroundColor: '#9C27B0',
  },
  slideBox: {
    backgroundColor: '#FF9800',
  },
  bounceBox: {
    backgroundColor: '#00BCD4',
  },
  shakeBox: {
    backgroundColor: '#F44336',
  },
  flipBox: {
    backgroundColor: '#3F51B5',
  },
  pulseBox: {
    backgroundColor: '#E91E63',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
  },
  dangerButton: {
    backgroundColor: '#F44336',
    flex: 1,
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
});

export default AnimationsDemo;
