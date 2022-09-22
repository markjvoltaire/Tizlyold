import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PostDetailsComments() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comments</Text>
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
