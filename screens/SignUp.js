import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

import { supabase } from "../services/supabase";

import { StackActions } from "@react-navigation/native";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const pushActionLogin = StackActions.replace("Login");

  const signUpWithEmail = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    const userId = supabase.auth.currentUser.id;
    await supabase.from("profiles").insert([
      {
        username: username,
        user_id: userId,
        email: email,
        displayName: displayName,
      },
    ]);

    if (password.length < 7) {
      Alert.alert("Password Should Be 8 or More Characters");
    }

    if (email === null) {
      Alert.alert("Please Fill All Field Inputs");
    }

    if (!error) {
      navigation.push("HomeScreen");
    } else {
      Alert.alert(error.message);
    }

    return { user, error };
  };

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image style={styles.logoBg} source={require("../assets/bg.png")} />
      <Image
        style={{
          position: "absolute",
          height: height * 0.03,
          alignSelf: "center",
          top: height * 0.08,
          resizeMode: "contain",
        }}
        source={require("../assets/Tizlymed.png")}
      />

      <TextInput
        style={{
          position: "absolute",
          left: width * 0.1,
          top: height * 0.2,
          borderColor: "grey",
          borderWidth: 0.5,
          height: height * 0.055,
          width: width * 0.83,
          borderRadius: 10,
          paddingLeft: width * 0.05,
        }}
        placeholder="Username"
        autoCapitalize="none"
        autoFocus={true}
        onChangeText={(text) =>
          setUsername(text.toLowerCase()) && setQuery(text.toLowerCase())
        }
        value={username}
      />

      <TextInput
        style={{
          position: "absolute",
          left: width * 0.1,
          top: height * 0.27,
          borderColor: "grey",
          borderWidth: 0.5,
          height: height * 0.055,
          width: width * 0.83,
          borderRadius: 10,
          paddingLeft: width * 0.05,
        }}
        placeholder="Display Name"
        autoCapitalize="none"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />

      <TextInput
        style={{
          position: "absolute",
          left: width * 0.1,
          top: height * 0.34,
          borderColor: "grey",
          borderWidth: 0.5,
          height: height * 0.055,
          width: width * 0.83,
          borderRadius: 10,
          paddingLeft: width * 0.05,
        }}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={false}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{
          position: "absolute",
          left: width * 0.1,
          top: height * 0.41,
          borderColor: "grey",
          borderWidth: 0.5,
          height: height * 0.055,
          width: width * 0.83,
          borderRadius: 10,
          paddingLeft: width * 0.05,
        }}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {username.length === 0 ? (
        <TouchableOpacity
          onPress={() => Alert.alert("Password Should Be 8 or More Characters")}
        >
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              height: height * 0.06,
              aspectRatio: 1,
              top: height * 0.5,
              alignSelf: "center",
            }}
            source={require("../assets/buttonGrey.png")}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => signUpWithEmail()}>
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              height: height * 0.06,
              aspectRatio: 1,
              top: height * 0.5,
              alignSelf: "center",
            }}
            source={require("../assets/buttonBlue.png")}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity>
        <Text
          onPress={() => navigation.dispatch(pushActionLogin)}
          style={{
            position: "absolute",
            fontWeight: "600",
            top: height * 0.68,
            alignSelf: "center",
            fontSize: 16,
            color: "#00A3FF",
          }}
        >
          Sign in Here
        </Text>
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
    top: 185,
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
  displayNameInput: {
    position: "absolute",
    left: 55,
    top: 250,
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
