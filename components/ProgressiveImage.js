import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useState, useEffect } from "react";

export default function ProgressiveImage({ defaultImageSource, source }) {
  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const [image, setImage] = useState();

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ alignSelf: "center" }}>
      <Animated.Image
        source={defaultImageSource}
        style={{
          opacity: defaultImageAnimated,
          height: 300,
          width: 300,
          alignSelf: "center",
        }}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />

      <Animated.Image
        source={source}
        style={{
          opacity: imageAnimated,
          height: 300,
          width: 300,
          position: "absolute",
        }}
        onLoad={handleImageLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
