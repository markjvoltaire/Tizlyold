import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

export default function StatusText({ item }) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  return (
    <View style={{ alignSelf: "center" }}>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "600",
          fontSize: 16,
          lineHeight: height * 0.029,
          color: "#4F4E4E",
        }}
      >
        {item.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
