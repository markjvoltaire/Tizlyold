import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
import { isTranslateY } from "react-native-redash";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function AnimatedBottomSheet({ translateY }) {
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
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
