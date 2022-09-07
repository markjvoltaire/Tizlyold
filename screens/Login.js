import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import { signIn, signInUser } from "../services/user";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const pushAction = StackActions.replace("HomeScreen");
  const pushActionSignUp = StackActions.replace("SignUp");

  async function loginWithEmail() {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (!error) {
      navigation.dispatch(pushAction);
    } else {
      Alert.alert(error.message);
    }
  }

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

      <Image
        style={styles.headerIcon}
        source={require("../assets/Tizlymed.png")}
      />

      <TextInput
        style={styles.emailInput}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
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

      <TouchableOpacity onPress={() => loginWithEmail()}>
        <Image
          style={styles.continueButton}
          source={require("../assets/buttonBlue.png")}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.signupRedirect}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text
            onPress={() => navigation.dispatch(pushActionSignUp)}
            style={styles.signupButton}
          >
            Sign Up Here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },

  logoBg: {
    position: "absolute",
    width: 538,
    height: 389,
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
    width: 100,
    height: 100,
    alignSelf: "center",
    top: 180,
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

  emailInput: {
    position: "absolute",
    alignSelf: "center",
    top: 300,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  passwordInput: {
    position: "absolute",
    alignSelf: "center",
    top: 370,
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
    top: 450,
    alignSelf: "center",
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
  signupRedirect: {
    top: 520,
    left: 65,
  },
  signupButton: {
    position: "absolute",
    width: 100,
    top: 503,
    left: 235,
    color: "#00A3FF",
  },
});
