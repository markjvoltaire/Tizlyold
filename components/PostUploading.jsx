import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function PostUploading() {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.8,
        width: 900,
        left: 1,
        bottom: 40,
        height: 3,
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
      }}
    />
  );
  return (
    <View style={{ backgroundColor: "white", height: height * 0.065 }}>
      <Text
        style={{ alignSelf: "center", top: height * 0.02, fontWeight: "600" }}
      >
        Your Post Is Uploading
      </Text>
      <View style={{ left: 320 }}>
        <LottieView
          style={{ height: 80, bottom: height * 0.009 }}
          source={require("../assets/lottie/airplaneLoading.json")}
          autoPlay
        />
      </View>
      <FullSeperator />
    </View>
  );
}

const styles = StyleSheet.create({});
