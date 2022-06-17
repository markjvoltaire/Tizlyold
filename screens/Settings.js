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
import { addUsername } from "../services/user";

export default function Settings({ navigation }) {
  const [username, setUsername] = useState("");

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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => signOutUser().then(() => navigation.navigate("Welcome"))}
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
    top: -350,
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
});
