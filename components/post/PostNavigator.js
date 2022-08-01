import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserButtons from "../home/UserButtons";

export default function PostNavigator() {
  return (
    <View style={styles.container}>
      <View style={{ right: 60 }}>
        <Button title="Videos" />
      </View>
      <View>
        <Button title="Photos" />
      </View>
      <View style={{ left: 60 }}>
        <Button title="Comments" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 370,
    justifyContent: "center",
    flexDirection: "row",
  },
});
