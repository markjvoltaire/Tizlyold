import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function UserProfileNav() {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const FullSeperatorVert = () => <View style={styles.fullSeperatorVert} />;
  return (
    <View style={styles.profileNav}>
      <TouchableOpacity>
        <Text style={styles.home}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.subscribers}>Media</Text>
      </TouchableOpacity>

      <FullSeperator />
      <FullSeperatorVert />
    </View>
  );
}

const styles = StyleSheet.create({
  profileNav: {
    position: "absolute",
    top: 85,
    width: 4000,
  },
  home: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 90,
    fontSize: 16,
  },
  media: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 140,
    fontSize: 16,
  },
  subscribers: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 245,
    fontSize: 16,
  },
  shop: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 330,
    fontSize: 16,
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    top: 430,
  },
  fullSeperatorVert: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 1.5,
    width: 60,
    left: 170,
    top: 400,
    color: "red",
    transform: [{ rotate: "90deg" }],
  },
});
