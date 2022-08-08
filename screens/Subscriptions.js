import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";

export default function Subscriptions({ navigation }) {
  const { user, setUser } = useUser();
  async function signOutUser() {
    await supabase.auth
      .signOut()
      .then(() =>
        console.log("supabase.auth.currentUser", supabase.auth.currentUser)
      );
  }
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    top: 300,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
