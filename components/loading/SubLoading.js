import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";

export default function SubLoading() {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <>
      <View
        style={{
          position: "absolute",
          height: height * 0.3,
          aspectRatio: 1,
          backgroundColor: "#EEEEEE",
          alignSelf: "center",
          top: height * 0.35,
          borderRadius: 20,
          alignItems: "center",
        }}
      ></View>
      <LottieView
        style={{
          height: height * 0.2,
          position: "absolute",
          top: height * 0.14,
        }}
        source={require("../../assets/lottie/purpleBox.json")}
        autoPlay
      />
      <Text style={{ fontSize: 15, top: height * 0.38, fontWeight: "600" }}>
        Processing Subscription
      </Text>
    </>
  );
}

const styles = StyleSheet.create({});
