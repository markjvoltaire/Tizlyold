import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";

export default function PostSkeleton() {
  const opacity = useRef(new Animated.Value(0.3));

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

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
    <View style={{ position: "absolute", alignSelf: "center" }}>
      <Animated.View
        style={{
          opacity: opacity.current,
          height: height * 0.454,

          aspectRatio: 1,
          borderRadius: 10,
          backgroundColor: "#CFCFCF",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
