import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import firebase from "firebase/compat";
import { useUser } from "../context/UserContext";

export default function Welcome({ navigation }) {
  const { user } = useUser();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image style={styles.logoBg} source={require("../assets/bg.png")} />
      <Image style={styles.tagLine} source={require("../assets/word.png")} />

      <TouchableOpacity onPress={() => console.log("user", user)}>
        <Image style={styles.logo} source={require("../assets/TizlyBig.png")} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          style={styles.signIn}
          source={require("../assets/signInButton.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Image
          style={styles.signUp}
          source={require("../assets/signUpButton.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    width: 200,
    height: 80,
    left: 110,
    top: 245,
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
    top: 376,
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
