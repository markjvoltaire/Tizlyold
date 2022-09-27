import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { Permissions, Contacts } from "expo-permissions";
import React, { useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import TopHeader from "../components/TopHeader";
import { useUser } from "../context/UserContext";
import LottieView from "lottie-react-native";

export default function UserProfileSubscribers({ navigation }) {
  const { user, setUser } = useUser();

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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopHeader user={user} />
      <View style={{ top: 50 }}>
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
        <LottieView
          style={{
            top: 10,
            height: 400,
            width: 400,
            position: "absolute",
            alignSelf: "center",
          }}
          source={require("../assets/lottie/uploadComplete.json")}
          autoPlay
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

      <View style={{ top: 170 }}>
        <Animated.View
          style={{
            opacity: opacity.current,
            aspectRatio: 1,
            left: 135,
            height: 35,
            width: 35,
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
            height: 30,
            borderRadius: 10,
            backgroundColor: "#CFCFCF",
          }}
        />

        <Animated.View
          style={{
            opacity: opacity.current,
            top: 5,
            left: 10,
            width: 220,
            height: 30,
            borderRadius: 10,
            backgroundColor: "#CFCFCF",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
