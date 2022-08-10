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
      <Image style={styles.logo} source={require("../assets/tizlyicon.jpg")} />
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.img}
          source={{
            uri: user.profileimage,
          }}
        />
        <Text style={styles.username}>{user.username}</Text>
      </View>

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
  logo: {
    position: "absolute",
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
    alignSelf: "center",
    top: 60,
  },
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
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  username: {
    fontWeight: "bold",
    fontSize: 23,
    left: 75,
    bottom: 45,
  },
  userInfoContainer: {
    bottom: 200,
    right: 100,
  },
});
