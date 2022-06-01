import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

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
          console.log(values);
        }}
        validationSchema={signupFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
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
              style={styles.userPic}
              source={require("../assets/userIcon.png")}
            />

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

            <TextInput style={styles.emailInput} placeholder="Email" />

            <TextInput style={styles.passwordInput} placeholder="Password" />

            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <Image
                style={styles.continueButton}
                source={require("../assets/continueButton.png")}
              />
            </TouchableOpacity>
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
    top: 350,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 25,
    paddingLeft: 30,
  },
  emailInput: {
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
});
