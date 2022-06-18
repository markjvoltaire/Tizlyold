import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { supabase } from "../../services/supabase";

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/tizlyicon.jpg")}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity>
        <Image
          style={styles.drawer}
          source={require("../../assets/drawer.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={styles.notification}
          source={require("../../assets/noti.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 30,
    backgroundColor: "white",
    left: 180,
  },

  logo: {
    position: "absolute",

    top: -380,
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
  },

  drawer: {
    position: "absolute",
    width: 24,
    bottom: 300,
    right: 555,
    backgroundColor: "white",
  },

  notification: {
    position: "absolute",
    width: 24,
    height: 24,
    bottom: 300,
    right: 255,
    backgroundColor: "white",
  },

  user: {
    position: "absolute",
    left: 195,
    top: -389,
    width: 32,
    height: 32,
  },
  searchInput: {
    position: "absolute",
    bottom: 299,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 25,
    backgroundColor: "#F3F3F9",
    width: 200,
    height: 35,
    left: -89,
  },
});
