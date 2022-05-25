import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function TrendingTag() {
  return (
    <View style={styles.container}>
      <Text style={styles.tagTitle}>TrendingTag</Text>
      <View style={styles.buttons}>
        <Button title="#StyleHacks" />
        <Button title="#HomeBusiness" />
        <Button title="#FitnessTips" />
        <Button title="#Cooking" />
        <Button title="#Wraps" />
        <Button title="#Gaming" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 2,
    marginHorizontal: "auto",
  },
  tagTitle: {
    position: "absolute",
    top: 250,
    right: 65,
  },
  buttons: {
    position: "absolute",
    top: 285,
    right: 60,
  },
});
