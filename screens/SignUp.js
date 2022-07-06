import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";

import { supabase } from "../services/supabase";
import { signUp } from "../services/user";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmail = async () => {
    let { user } = await supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then(() =>
        console.log("supabase.auth.currentUser", supabase.auth.currentUser)
      )
      .then(() => navigation.navigate("Username"));

    return { user, error };
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image style={styles.logoBg} source={require("../assets/bg.png")} />
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

      <TextInput
        style={styles.emailInput}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={false}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity onPress={() => signUpWithEmail()}>
        <Image
          style={styles.continueButton}
          source={require("../assets/buttonBlue.png")}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    position: "absolute",
    width: 100,
    height: 100,
    left: 168,
    top: 150,
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
    top: 255,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  emailInput: {
    position: "absolute",
    left: 55,
    top: 320,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  passwordInput: {
    position: "absolute",
    left: 55,
    top: 385,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  continueButton: {
    position: "absolute",
    width: 311,
    height: 50,
    top: 460,
    left: 55,
  },
  userPic: {
    resizeMode: "contain",
    width: 128,
    height: 90,
    top: 130,
    left: 145,
  },
  logoBg: {
    position: "absolute",
    width: 538,
    height: 389,
    top: -70,
  },
  signupButton: {
    position: "absolute",
    width: 100,
    top: 505,
    left: 245,
    color: "#00A3FF",
  },
  signupRedirect: {
    top: 518,
    left: 65,
  },
  profilePic: {
    position: "absolute",
    resizeMode: "contain",
    top: 125,
    left: 165,
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    overflow: "hidden",
  },
  profilePicPlus: {
    position: "absolute",
    resizeMode: "contain",
    top: 185,
    left: 220,
    width: 20,
    height: 20,
  },
});
