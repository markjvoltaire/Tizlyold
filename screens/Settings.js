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
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "../services/supabase";
import { addUsername, createProfileImage } from "../services/user";
import { useUser } from "../context/UserContext";
import { StackActions } from "@react-navigation/native";
import { usePoints } from "../context/PointsContext";
import BackHeader from "../components/BackHeader";

export default function Settings({ navigation }) {
  const { user, setUser } = useUser();
  const { points, setPoints } = usePoints();
  async function signOutUser() {
    await supabase.auth.signOut();
  }

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <BackHeader navigation={navigation} />
      <Text
        style={{
          fontWeight: "700",
          fontSize: 18,
          top: 165,
          position: "absolute",
          left: 100,
        }}
      >
        {user.username}
      </Text>
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 100,
          top: 150,
          left: 10,
          position: "absolute",
        }}
        source={
          user.profileimage
            ? { uri: user.profileimage }
            : require("../assets/noProfilePic.jpeg")
        }
      />

      <View style={{ position: "absolute", top: 300, left: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../assets/Profile.jpg")}
          />
          <Image
            resizeMode="contain"
            style={{
              height: height * 0.02,
              left: width * 0.78,
              bottom: height * 0.023,
            }}
            source={require("../assets/arrow.png")}
          />
          <Text
            style={{
              fontWeight: "400",
              left: width * 0.19,
              bottom: height * 0.043,
            }}
          >
            Account Settings
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", alignSelf: "center", top: 400 }}>
        <TouchableOpacity
          onPress={() =>
            signOutUser().then(() => navigation.navigate("Welcome"))
          }
        >
          <Image
            style={styles.signoutButton}
            source={require("../assets/signoutButton.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileimage: {
    height: 30,
    width: 30,
    borderRadius: 100,
    left: 296,
    top: 12,
  },

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
    fontSize: 23,
    right: 15,
    bottom: 145,
    position: "absolute",
  },
});
