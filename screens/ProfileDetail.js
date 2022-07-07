import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import React from "react";

export default function ProfileDetail({ navigation, route }) {
  console.log("route.params.user", route.params);
  return (
    <View>
      <Image
        style={styles.userBanner}
        source={{ uri: route.params.bannerImage }}
      />

      <Image
        style={styles.userBanner}
        source={require("../assets/fader.png")}
      />

      <Image
        style={styles.profileImage}
        source={{ uri: route.params.profileimage }}
      />

      <View style={styles.userinfoContainer}>
        <Text style={styles.displayname}>{route.params.displayName}</Text>
        <Text style={styles.username}>@{route.params.username}</Text>
        <Text style={styles.bio}>{route.params.bio}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  backButton: {
    top: 100,
    width: 50,
    height: 50,
    left: 30,
  },

  userBanner: {
    position: "absolute",
    width: 455,
    right: -10,
    height: 455,
  },
  profileImage: {
    position: "absolute",
    left: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
    top: 250,
    borderRadius: 100,
  },

  displayname: {
    position: "absolute",
    height: 38,
    left: 75,
    right: 64.27,
    top: 253,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    width: 400,
  },
  username: {
    position: "absolute",
    color: "white",
    top: 283,
    left: 75,
  },

  bio: {
    position: "absolute",
    color: "white",
    fontSize: 12,
    width: 400,
    top: 320,
    left: 8,
  },
});
