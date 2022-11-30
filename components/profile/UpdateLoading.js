import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function UpdateLoading() {
  return (
    <SafeAreaView>
      <LottieView
        style={{ height: 130, width: 130, position: "absolute", top: 110 }}
        source={require("../../assets/lottie/loading.json")}
        autoPlay
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
