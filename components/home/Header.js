import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "../../services/supabase";

export default function Header() {
  const [query, setQuery] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/tizlyicon.jpg")}
      />

      <View>
        <TextInput
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setQuery(text)}
          value={query}
        />

        <Image
          style={styles.searchIcon}
          source={require("../../assets/Search.png")}
        />
      </View>

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
    bottom: 303,
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
    bottom: 295,
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 25,
    backgroundColor: "#F3F3F9",
    width: 200,
    height: 35,
    left: -89,
  },
  searchIcon: {
    position: "absolute",
    bottom: 304,
    width: 20,
    height: 20,
    left: 80,
  },
});
