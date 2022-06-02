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
import React from "react";
import firebase from "../firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
export default function Login({ navigation }) {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password must have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("firebase login works", email, password);
    } catch (error) {
      Alert.alert(error.message);
      console.log(Alert.alert(error.message));
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
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
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />

            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />

            <TouchableOpacity onPress={handleSubmit}>
              <Image
                style={styles.continueButton}
                source={require("../assets/buttonBlue.png")}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.signupRedirect}>
                Don't have an account account?
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigation.navigate("SignUp")}
                  style={styles.signupButton}
                >
                  Sign Up Here
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
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
    left: 168,
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
    left: 55,
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
    left: 55,
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
  signupRedirect: {
    top: 520,
    left: 65,
  },
  signupButton: {
    position: "absolute",
    width: 100,
    top: 503,
    left: 279,
    color: "#00A3FF",
  },
});
