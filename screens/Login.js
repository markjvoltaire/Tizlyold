import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";

export default function Login({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image
        style={styles.headerIcon}
        source={require("../assets/Tizlymed.png")}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <Image
        style={styles.headerIcon}
        source={require("../assets/Tizlymed.png")}
      />

      <Image
        style={styles.userPic}
        source={require("../assets/userIcon.png")}
      />

      <Text style={styles.tagline}>Log Back Into Your Account</Text>

      <TextInput style={styles.usernameInput} placeholder="Username" />

      <TextInput style={styles.passwordInput} placeholder="Password" />

      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Image
          style={styles.continueButton}
          source={require("../assets/continueButton.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  headerIcon: {
    position: "absolute",
    width: 80,
    height: 39,
    left: 168,
    top: 80,
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    left: 41,
    top: 90,
  },
  headerIcon: {
    position: "absolute",
    width: 80,
    height: 39,
    left: 168,
    top: 80,
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    left: 41,
    top: 90,
  },

  usernameInput: {
    position: "absolute",
    left: 55,
    top: 440,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 25,
    paddingLeft: 30,
  },
  passwordInput: {
    position: "absolute",
    left: 55,
    top: 530,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 25,
    paddingLeft: 30,
  },
  continueButton: {
    position: "absolute",
    width: 311,
    height: 50,
    top: 630,
    left: 55,
  },
  userPic: {
    resizeMode: "contain",
    width: 128,
    height: 90,
    top: 130,
    left: 145,
  },
  tagline: {
    top: 220,
    left: 55,
  },
});
