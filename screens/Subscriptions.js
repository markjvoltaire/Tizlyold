import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function Subscriptions({ navigation }) {
  const SPING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  };
  const dimensions = useWindowDimensions();

  console.log(dimensions.height * 0);

  const top = useSharedValue(dimensions.height);

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPING_CONFIG),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },

    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },

    onEnd() {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height;
      } else {
        top.value = dimensions.height / 2;
      }
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Open Sheet"
        onPress={() => {
          top.value = withSpring(dimensions.height / 1.48, SPING_CONFIG);
        }}
      />

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 50,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
        >
          <Button title="Edit" />
          <Button title="Share" />
          <Button
            onPress={() => {
              top.value = withSpring(dimensions.height, {
                damping: 80,
                overshootClamping: true,
                restDisplacementThreshold: 0.1,
                restSpeedThreshold: 0.1,
                stiffness: 500,
              });
            }}
            title="Cancel"
            color="red"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
  },
});
