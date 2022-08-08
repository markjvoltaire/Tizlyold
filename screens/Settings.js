import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "../services/supabase";
import { addUsername, createProfileImage } from "../services/user";
import { useUser } from "../context/UserContext";

export default function Settings({ navigation }) {
  const { user, setUser } = useUser();
  async function signOutUser() {
    await supabase.auth
      .signOut()
      .then(() =>
        console.log("supabase.auth.currentUser", supabase.auth.currentUser)
      );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={styles.username}>{user.username}</Text>

      <Image
        style={styles.img}
        source={{
          uri: user.profileimage,
        }}
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
      <View style={styles.accountSettings}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../assets/Profile.jpg")}
          />
          <Image style={styles.arrow} source={require("../assets/arrow.png")} />
          <Text style={styles.accountSettingsText}> Account Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() =>
          signOutUser()
            .then(() => setUser({}))
            .then(() => navigation.navigate("Welcome"))
        }
      >
        <Image
          style={styles.signoutButton}
          source={require("../assets/signoutButton.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    left: -170,
    top: -400,
  },

  signoutButton: {
    position: "absolute",
    height: 54,
    width: 315,
    right: -160,
    top: 250,
  },
  usernameInput: {
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
  button: {
    position: "absolute",
    resizeMode: "contain",
    width: 300,
    left: -150,
  },
  username: {
    position: "absolute",
    bottom: 600,
    fontWeight: "bold",
    fontSize: 23,
    right: 290,
  },
  accountSettingsText: {
    left: 39,
    bottom: 20,
    fontWeight: "400",
  },
  arrow: {
    position: "absolute",
    height: 13,
    width: 13,
    left: 350,
    top: 7,
  },
  accountSettings: {
    position: "absolute",
    right: 280,
    bottom: 500,
  },
  img: {
    position: "absolute",
    height: 60,
    width: 60,
    top: 150,
    right: 320,
    borderRadius: 100,
  },
});
