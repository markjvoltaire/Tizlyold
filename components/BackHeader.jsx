import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function BackHeader({ navigation, scheme }) {
  const { user, setUser } = useUser();

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#121212",
        height: height * 0.11,
      }}
    >
      <View style={{ alignSelf: "center", bottom: height * 0.02 }}>
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.12,
          }}
          source={require("../assets/Tizlymed.png")}
        />
      </View>

      <View style={{ bottom: height * 0.11, left: width * 0.05 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={{
              height: height * 0.029,
              aspectRatio: 1,
              borderRadius: 100,
            }}
            source={require("../assets/backButton.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
