import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useUser } from "../../context/UserContext";

export default function HomeBoard() {
  const { user } = useUser();
  console.log("user", user);
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Hello {user} </Text>

      <TouchableOpacity>
        <Image
          style={styles.homeboard}
          source={require("../../assets/homeBanner.png")}
        />
      </TouchableOpacity>
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
    width: 100,
    left: -160,
    fontWeight: "bold",
  },

  homeboard: {
    position: "absolute",
    top: -260,
    left: -188,
    height: 200,
    width: 430,
  },
});
