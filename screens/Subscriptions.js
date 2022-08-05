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
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Sheet" />
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

// const SPING_CONFIG = {
//   damping: 80,
//   overshootClamping: true,
//   restDisplacementThreshold: 0.1,
//   restSpeedThreshold: 0.1,
//   stiffness: 500,
// };
// const dimensions = useWindowDimensions();

// console.log(dimensions.height * 0);

// const top = useSharedValue(dimensions.height);

// const style = useAnimatedStyle(() => {
//   return {
//     top: withSpring(top.value, SPING_CONFIG),
//   };
// });

// const gestureHandler = useAnimatedGestureHandler({
//   onStart(_, context) {
//     context.startTop = top.value;
//   },

//   onActive(event, context) {
//     top.value = context.startTop + event.translationY;
//   },

//   onEnd() {
//     if (top.value > dimensions.height / 2 + 200) {
//       top.value = dimensions.height;
//     } else {
//       top.value = dimensions.height / 2;
//     }
//   },
// });
