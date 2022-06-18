import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/home/Header";

export default function Explore() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ontainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});
