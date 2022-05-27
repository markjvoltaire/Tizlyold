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
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/tizlyicon.jpg")}
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

      <TouchableOpacity>
        <Image style={styles.user} source={require("../../assets/mark.png")} />
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
    position: "relative",
    top: -360,
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
  },

  drawer: {
    position: "absolute",
    width: 24,
    bottom: 365,
    right: 565,
    backgroundColor: "white",
  },

  notification: {
    position: "absolute",
    width: 24,
    height: 24,
    bottom: 360,
    right: 273,
    backgroundColor: "white",
  },

  user: {
    position: "absolute",
    left: 195,
    top: -389,
    width: 32,
    height: 32,
  },
});
