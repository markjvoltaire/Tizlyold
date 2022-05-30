import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.headerIcon}
        source={require("../../assets/Tizlymed.png")}
      />

      <TouchableOpacity>
        <Image
          style={styles.backButton}
          source={require("../../assets/backButton.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  headerIcon: {
    position: "absolute",
    width: 80,
    height: 39,
    left: 168,
    top: 60,
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    left: 41,
  },
});
