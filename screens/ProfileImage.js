import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function ProfileImage() {
  return (
    <View>
      <Image style={styles.icon} source={require("../assets/noProfile.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    resizeMode: "contain",
    borderRadius: 300,
    width: 110,
    top: 40,
    left: 40,
  },
});
