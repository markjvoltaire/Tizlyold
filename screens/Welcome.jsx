import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  useColorScheme,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { StackActions } from "@react-navigation/native";

import { supabase } from "../services/supabase";

import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function Welcome({ navigation }) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const replaceActionLogin = StackActions.replace("Login");
  const scheme = useColorScheme();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [loginVisible, setLoginVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username, setUsername] = useState("");
  const { user, setUser } = useUser();
  const { userAuth, setUserAuth } = useAuth();
  const [displayName, setDisplayName] = useState("");

  function closeLoginModal() {
    setLoginVisible(false);
    setEmail("");
    setPassword("");
  }

  function closeSignupModal() {
    setSignUpVisible(false);
    setEmail("");
    setPassword("");
  }

  async function loginWithEmail() {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }

    setUserAuth(user);
  }

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
        displayName: username,
      },
    ]);

    if (password.length || confirmPassword.length < 7) {
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
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#121212", alignItems: "center" }}
    >
      <Video
        source={require("../assets/homeVid.mp4")}
        ref={video}
        isLooping
        isMuted
        shouldPlay
        style={{
          height: height,
          aspectRatio: 1,
          alignSelf: "center",
          borderRadius: 10,
          position: "absolute",
        }}
        resizeMode="cover"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        on
      />
      <Image
        style={{
          width: width,
          top: height * 0.45,
          height: height * 0.5,
        }}
        source={require("../assets/Background.png")}
      />
      <Text
        style={{
          fontFamily: "ArialRoundedMTBold",
          color: "white",
          fontSize: 25,
          fontWeight: "800",
          bottom: height * 0.2,
        }}
      >
        Created To Create.
      </Text>
      <TouchableOpacity onPress={() => setLoginVisible(true)}>
        <Text
          style={{
            fontFamily: "ArialRoundedMTBold",
            color: "white",
            fontSize: 20,
            top: height * 0.09,
          }}
        >
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSignUpVisible()}>
        <Text
          style={{
            fontFamily: "ArialRoundedMTBold",
            color: "white",
            fontSize: 20,
            top: height * 0.13,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      {/*================================================= SIGN IN ======================================================*/}

      <Modal transparent={true} animationType="slide" visible={loginVisible}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
          <TouchableOpacity onPress={() => closeLoginModal()}>
            <Image
              resizeMode="contain"
              style={{
                height: height * 0.02,
                left: width * 0.05,
                top: 17.8,

                transform: [{ rotate: "180deg" }],
              }}
              source={require("../assets/arrow.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Log in
          </Text>

          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                top: height * 0.06,

                fontSize: 18,
              }}
            >
              Email
            </Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              placeholder="Enter Your Email"
              placeholderTextColor="white"
              onChangeText={(text) => setEmail(text)}
              value={email}
              style={{
                top: height * 0.07,
                width: width * 0.9,
                height: height * 0.05,
                color: "white",
                backgroundColor: "grey",
                borderRadius: 13,
                borderColor: "grey",
                borderWidth: 1,
                paddingLeft: width * 0.03,
                backgroundColor: "#4A4A4A",
                fontWeight: "bold",
              }}
            />
          </View>

          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              top: height * 0.05,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                top: height * 0.06,

                fontSize: 18,
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                top: height * 0.07,
                width: width * 0.9,
                height: height * 0.05,
                color: "white",
                borderRadius: 13,
                borderColor: "grey",
                borderWidth: 1,
                paddingLeft: width * 0.03,
                backgroundColor: "#4A4A4A",
                fontWeight: "bold",
              }}
              placeholder="Enter Your Password"
              placeholderTextColor="white"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

          <View style={{ top: height * 0.2, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => loginWithEmail()}>
              <View
                style={{
                  backgroundColor: "#00AEF9",
                  height: height * 0.04,
                  width: width * 0.6,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    alignSelf: "center",
                    top: height * 0.012,
                  }}
                >
                  Log In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/*================================================= SIGN IN ======================================================*/}

      {/*================================================= SIGN UP ======================================================*/}

      <Modal transparent={true} animationType="slide" visible={signUpVisible}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
          <TouchableOpacity onPress={() => closeSignupModal()}>
            <Image
              resizeMode="contain"
              style={{
                height: height * 0.02,
                left: width * 0.05,
                top: 17.8,

                transform: [{ rotate: "180deg" }],
              }}
              source={require("../assets/arrow.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Sign up
          </Text>

          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                top: height * 0.06,

                fontSize: 18,
              }}
            >
              Username
            </Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholderTextColor="white"
              placeholder="Enter Your Username"
              onChangeText={(text) => setUsername(text)}
              value={username}
              style={{
                top: height * 0.07,
                width: width * 0.9,
                height: height * 0.05,
                borderRadius: 13,
                borderColor: "grey",
                borderWidth: 1,
                paddingLeft: width * 0.03,
                backgroundColor: "#4A4A4A",
                color: "white",
              }}
            />
          </View>

          <View
            style={{
              alignSelf: "center",

              top: height * 0.05,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                top: height * 0.06,

                fontSize: 18,
              }}
            >
              Email
            </Text>
            <TextInput
              style={{
                top: height * 0.07,
                width: width * 0.9,
                height: height * 0.05,
                borderRadius: 13,
                borderColor: "grey",
                borderWidth: 1,
                paddingLeft: width * 0.03,
                backgroundColor: "#4A4A4A",
                color: "white",
              }}
              placeholderTextColor="white"
              placeholder="Enter Your Email"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View
            style={{
              alignSelf: "center",

              top: height * 0.1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                top: height * 0.06,

                fontSize: 18,
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                top: height * 0.07,
                width: width * 0.9,
                height: height * 0.05,
                borderRadius: 13,
                borderColor: "grey",
                borderWidth: 1,
                paddingLeft: width * 0.03,
                backgroundColor: "#4A4A4A",
                color: "white",
              }}
              placeholderTextColor="white"
              placeholder="Enter Your Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

          <View
            style={{
              alignSelf: "center",

              top: height * 0.15,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                top: height * 0.06,

                fontSize: 18,
              }}
            >
              Confirm Password
            </Text>
            <TextInput
              style={{
                top: height * 0.07,
                width: width * 0.9,
                height: height * 0.05,
                borderRadius: 13,
                borderColor: "grey",
                borderWidth: 1,
                paddingLeft: width * 0.03,
                backgroundColor: "#4A4A4A",
                color: "white",
              }}
              placeholderTextColor="white"
              autoCapitalize="none"
              placeholder="Confirm Your Password"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>

          <View style={{ top: height * 0.3, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => signUpWithEmail()}>
              <View
                style={{
                  backgroundColor: "#00AEF9",
                  height: height * 0.04,
                  width: width * 0.6,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    alignSelf: "center",
                    top: height * 0.012,
                  }}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/*================================================= SIGN UP ======================================================*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
