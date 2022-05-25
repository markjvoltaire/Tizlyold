import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function HomeBoard() {
  return (
    <View>
      <Text style={styles.header}> Hello Mark </Text>
      <TouchableOpacity>
        <Image
          style={styles.homeboard}
          source={require("../../assets/homeboard.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: -300,
    color: "black",
    width: 100,
    left: -160,
  },

  homeboard: {
    position: "absolute",
    left: -190,
    top: -260,
    width: 430,
  },
});
