import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";

export default function Welcome() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image style={styles.logoBg} source={require("../assets/bg.png")} />
      <Image style={styles.tagLine} source={require("../assets/word.png")} />
      <Image style={styles.logo} source={require("../assets/TizlyBig.png")} />
      <Image
        style={styles.signIn}
        source={require("../assets/signInButton.png")}
      />
      <Image
        style={styles.signUp}
        source={require("../assets/signUpButton.png")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    width: 200,
    height: 80,
    left: 110,
    top: 225,
  },
  logoBg: {
    position: "absolute",
    width: 538,
    height: 389,
  },
  tagLine: {
    position: "absolute",
    width: 230,
    height: 20,
    top: 356,
    left: 100,
  },
  signIn: {
    position: "absolute",
    width: 315,
    height: 65,
    top: 502,
    left: 60,
  },
  signUp: {
    position: "absolute",
    width: 315,
    height: 65,
    top: 587,
    left: 60,
  },
});
