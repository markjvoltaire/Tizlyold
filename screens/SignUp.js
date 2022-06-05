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
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase, db } from "../firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import * as ImagePicker from "expo-image-picker";

export default function SignUp({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const signupFormSchema = Yup.object().shape({
    username: Yup.string().required("An username is required"),
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password must have at least 8 characters"),
  });

  const onSignup = async (username, email, password) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password, username);
      console.log("firebase sign up works", email, password, username);

      db.collection("users").add({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profilePic: authUser.user.profilePic,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    console.log("ImagePicker", ImagePicker);
  };

  let profileImage;

  <TouchableOpacity onPress={pickImage}>
    <Image
      style={styles.profilePic}
      source={require("../assets/noProfilePic.jpeg")}
    />
    <Image
      style={styles.profilePicPlus}
      source={require("../assets/bluePlus.png")}
    />
  </TouchableOpacity>;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          profilePic: "",
        }}
        onSubmit={(values) => {
          onSignup(values.username, values.email, values.password);
        }}
        validationSchema={signupFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          profileImage,
        }) => (
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

            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.profilePic}
                source={require("../assets/noProfilePic.jpeg")}
              />
              <Image
                style={styles.profilePicPlus}
                source={require("../assets/bluePlus.png")}
              />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                title="Pick an image from camera roll"
                onPress={pickImage}
              >
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      position: "absolute",
                      top: 125,
                      width: 100,
                      height: 100,
                      left: -50,
                      top: 120,
                      borderRadius: 400,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

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
                Already have an account ?
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
    top: 50,
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
    top: 240,
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
    top: 305,
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
    top: 440,
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
    top: 500.5,
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
