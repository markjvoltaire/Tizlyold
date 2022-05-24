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

export default function Header() {
  return (
    <SafeAreaView>
      <Image style={styles.logo} source={require("../../assets/Tizly.jpg")} />
      <TouchableOpacity>
        <Image
          style={styles.drawer}
          source={require("../../assets/drawer.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "relative",
    top: -415,
    resizeMode: "contain",
  },

  drawer: {
    position: "absolute",
    width: 24,
    bottom: 360,
    right: 180,
  },
});
