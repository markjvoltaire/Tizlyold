import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import firebase from "../firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

export default function SignUp({ navigation }) {
  const signupFormSchema = Yup.object().shape({
    username: Yup.string().required("An username is required"),
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password must have at least 8 characters"),
  });

  const onSignup = async (username, email, password) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password, username);
      console.log("firebase sign up works", email, password, username);
    } catch (error) {
      Alert.alert(error.message);
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
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.username, values.email, values.password);
        }}
        validationSchema={signupFormSchema}
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

            <TextInput
              style={styles.usernameInput}
              placeholder="Username"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("usename")}
              value={values.username}
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
                Already have an account account?
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={styles.signupButton}
                >
                  Log In Here
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
  headerIcon: {
    position: "absolute",
    width: 80,
    height: 39,
    left: 168,
    top: 90,
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
    top: 220,
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
    top: 285,
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
    top: 350,
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
    top: 420,
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
    top: 484.5,
    left: 294,
    color: "#00A3FF",
  },
  signupRedirect: {
    top: 502,
    left: 65,
  },
});
