import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PostDetailsPhotos({ creatorDisplayName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Photos By {creatorDisplayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 70,
  },
  header: {
    fontWeight: "800",
    color: "#4F4E4E",
  },
});
