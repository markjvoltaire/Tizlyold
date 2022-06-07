import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";

export default function UserProfile() {
  return (
    <SafeAreaView>
      <Image
        style={styles.userBanner}
        source={require("../assets/desinew.png")}
      />

      <Image
        style={styles.userBanner}
        source={require("../assets/fader.png")}
      />
      <View style={styles.userinfoContainer}>
        <Text style={styles.displayname}>Desi Banks</Text>
        <Text style={styles.username}>@desibanks</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    right: 0.5,
    height: 455,
  },

  displayname: {
    position: "absolute",
    height: 38,
    left: 12.53,
    right: 64.27,
    top: 300,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  username: {
    position: "absolute",
    color: "white",
    top: 330,
    left: 10,
  },
  userinfoContainer: {
    left: 3,
  },
});
