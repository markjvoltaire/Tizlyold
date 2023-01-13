import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useUser } from "../context/UserContext";
import { StackActions } from "@react-navigation/native";

export default function Welcome({ navigation }) {
  const replaceActionLogin = StackActions.replace("Login");
  const replaceActionSignUp = StackActions.replace("SignUp");
  const { user } = useUser();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
      }}
    >
      <Image style={styles.logoBg} source={require("../assets/bg.png")} />
      <Image style={styles.tagLine} source={require("../assets/word.png")} />

      <TouchableOpacity>
        <Image style={styles.logo} source={require("../assets/TizlyBig.png")} />
      </TouchableOpacity>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(replaceActionLogin)}
        >
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 80,
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
    top: 356.5,
  },
  signIn: {
    width: 315,
    height: 65,
    top: 502,
  },
  signUp: {
    width: 315,
    height: 65,
    top: 517,
  },
  buttons: {
    bottom: 90,
  },
});
