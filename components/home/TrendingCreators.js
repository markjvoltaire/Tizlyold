import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function TrendingCreators() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.creatorImage}
        source={require("../../assets/desi.png")}
      />

      <Image
        style={styles.creatorImage}
        source={require("../../assets/iaa.png")}
      />

      <Image
        style={styles.creatorImage}
        source={require("../../assets/complex.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -100,
  },
  creatorRow: {
    position: "absolute",
    flexDirection: "row",
  },

  creatorImage: {
    justifyContent: "space-between",
  },
});
