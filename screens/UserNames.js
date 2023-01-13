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
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { supabase } from "../services/supabase";

import { StackActions } from "@react-navigation/native";

export default function UserNames({ navigation }) {
  const [query, setQuery] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const allUsernames = filterData.map((i) => i.username);

  const pushActionHome = StackActions.replace("HomeScreen");

  async function addUser() {
    const userId = supabase.auth.currentUser.id;

    const { data, error } = await supabase.from("profiles").insert([
      {
        username: username,
        user_id: userId,
        email: supabase.auth.currentUser.email,
        displayName: displayName,
      },
    ]);
    if (!error) {
      navigation.navigate("HomeScreen");
    }
    if (
      error.message ===
      'duplicate key value violates unique constraint "profiles_username_key"'
    ) {
      Alert.alert("This Username Is Already Taken");
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

      <TouchableOpacity onPress={() => navigation.navigate("ProfileImage")}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <Text style={styles.helpline}>Please Enter your username</Text>

      <TextInput
        style={styles.usernameInput}
        placeholder="Username"
        autoCapitalize="none"
        autoFocus={true}
        onChangeText={(text) =>
          setUsername(text.toLowerCase()) && setQuery(text.toLowerCase())
        }
        value={username}
      />

      <TextInput
        style={styles.displayNameInput}
        placeholder="Display Name"
        autoCapitalize="none"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />

      <TouchableOpacity onPress={() => addUser()}>
        <Image
          style={styles.continueButton}
          source={require("../assets/buttonBlue.png")}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 10,
    paddingLeft: 30,
  },

  headerIcon: {
    position: "absolute",
    width: 100,
    height: 100,
    left: 168,
    top: 180,
    resizeMode: "contain",
  },
  continueButton: {
    position: "absolute",
    width: 311,
    height: 50,
    top: 490,
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
  helpline: {
    position: "absolute",
    top: 300,
    left: 120,
    opacity: 0.6,
  },
  displayNameInput: {
    position: "absolute",
    left: 55,
    top: 415,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
});
