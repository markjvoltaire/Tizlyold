import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useUser } from "./context/UserContext";
import LazyHeader from "./components/LazyHeader";

export default function ProfileSkeleton({ navigation }) {
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
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ bottom: 50 }}>
          <Animated.View
            style={{
              opacity: opacity.current,
              alignSelf: "center",
              height: 445,
              width: 455,

              backgroundColor: "#CFCFCF",
            }}
          />

          <View style={{ top: 120 }}>
            <View style={{ bottom: 10 }}>
              <Animated.View
                style={{
                  opacity: opacity.current,
                  alignSelf: "center",
                  height: 3,
                  width: 470,
                  left: 10,
                  borderRadius: 100,
                  bottom: 55,
                  backgroundColor: "#CFCFCF",
                }}
              />
            </View>
            <Animated.View
              style={{
                opacity: opacity.current,
                aspectRatio: 1,
                alignSelf: "center",
                height: 35,
                right: 50,
                borderRadius: 100,
                bottom: 30,
                backgroundColor: "#CFCFCF",
              }}
            />

            <Animated.View
              style={{
                opacity: opacity.current,
                alignSelf: "center",
                height: 5,
                width: 125,
                left: 35,
                borderRadius: 100,
                bottom: 60,
                backgroundColor: "#CFCFCF",
              }}
            />

            <Animated.View
              style={{
                opacity: opacity.current,
                alignSelf: "center",
                height: 5,
                width: 70,
                left: 10,
                borderRadius: 100,
                bottom: 55,
                backgroundColor: "#CFCFCF",
              }}
            />

            <Animated.View
              style={{
                opacity: opacity.current,
                aspectRatio: 1,
                alignSelf: "center",
                height: 398,
                borderRadius: 10,
                backgroundColor: "#CFCFCF",
              }}
            />

            <Animated.View
              style={{
                opacity: opacity.current,
                top: 15,
                left: 10,
                width: 220,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#CFCFCF",
              }}
            />

            <Animated.View
              style={{
                opacity: opacity.current,
                top: 25,
                left: 10,
                width: 360,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#CFCFCF",
              }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("./assets/backButton2.png")}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    top: 70,
  },
});
