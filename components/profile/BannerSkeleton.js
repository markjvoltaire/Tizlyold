import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

export default function BannerSkeleton() {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);
  return (
    <View>
      <Animated.View
        style={{
          opacity: opacity.current,

          alignSelf: "center",
          width: 455,
          height: 455,
          borderRadius: 10,
          backgroundColor: "#EBEBFF",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
