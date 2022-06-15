import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { supabase } from "../services/supabase";

export default function Settings({ navigation }) {
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

  signoutButton: {
    position: "absolute",
    height: 54,
    width: 315,
    right: -160,
    top: 250,
  },
});
