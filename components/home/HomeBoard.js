import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function HomeBoard() {
  // bring this back when we can store the user name in context when logging in
  // const { user } = useUser();
  // console.log("user", user);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.homeboard}
          source={require("../../assets/homeBanner.png")}
        />
      </TouchableOpacity>

      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 180,
  },
  header: {
    position: "absolute",
    top: -300,
    color: "black",
    width: 500,
    left: -160,
    fontWeight: "bold",
  },

  homeboard: {
    position: "absolute",
    top: -230,
    left: -188,
    height: 200,
    width: 430,
  },
});
