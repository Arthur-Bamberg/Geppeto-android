import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { colors } from '../../styles/colors';

export const LoadingAnimation = () => {
  const ballDiameter = 20;
  const duration = 275;

  const createBallStyle = (animatedValue) => ({
    width: ballDiameter,
    height: ballDiameter,
    backgroundColor: colors.header,
    borderRadius: ballDiameter / 2,
    marginHorizontal: 5,
    transform: [{ translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, -25] }) }],
  });

  const balls = [
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0]
  ];

  const moveBall = (ballIndex) => {
    Animated.sequence([
      Animated.timing(balls[ballIndex], {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(balls[ballIndex], {
        toValue: 0,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (ballIndex === 2) {
        ballIndex = 0;
        const interval = setInterval(() => {
          moveBall(ballIndex);
          clearInterval(interval);
        }, duration);

      } else {
        ballIndex = ballIndex + 1;
        moveBall(ballIndex);
      }
    });
  };

  useEffect(() => {
    moveBall(0);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={createBallStyle(balls[0])} />
      <Animated.View style={createBallStyle(balls[1])} />
      <Animated.View style={createBallStyle(balls[2])} />
    </View>
  );
};
