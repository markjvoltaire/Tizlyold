import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { usePoints } from "../context/PointsContext";
import { useUser } from "../context/UserContext";

export default function GeneralSettings({ navigation }) {
  const { points, setPoints } = usePoints(points);
  const { user, setUser } = useUser();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={styles.pageTitle}>General Settings</Text>

      <View style={styles.userProfileImages}>
        <TextInput
          placeholder="Username"
          style={styles.username}
          value={tizlyPoints}
        />

        <TouchableOpacity onPress={() => editProfile()}>
          <Image
            style={styles.button}
            source={require("../assets/continueButton.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            position: "absolute",
            resizeMode: "contain",
            width: 25,
            height: 30,
            left: 20,
            top: 60,
          }}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  button: {
    position: "absolute",
    width: 311,
    height: 50,
    left: 52,
    top: 600,
  },

  imagesAndInputs: {
    position: "absolute",
  },

  bluePlusProfile: {
    position: "absolute",
    resizeMode: "contain",
    top: 228,
    height: 30,
    width: 30,
    left: 114,
  },

  bluePlusBanner: {
    position: "absolute",
    resizeMode: "contain",
    top: 235,
    height: 30,
    width: 30,
    left: 345,
  },

  logo: {
    position: "absolute",
    resizeMode: "contain",
    height: 39,
    width: 50,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    top: 60,
  },

  pageTitle: {
    position: "absolute",
    fontSize: 15,
    top: 70,
    fontWeight: "600",
    alignSelf: "center",
  },

  verticleDiv: {
    position: "absolute",
    top: 140,
    left: 190,
    height: 120,
  },

  inputs: {
    position: "absolute",
    top: 140,
  },
  userProfileImages: {
    position: "absolute",

    borderColor: "#5C5C5C",
    borderWidth: 0.2,
  },

  profileImage: {
    position: "absolute",
    left: 50,
    width: 105,
    height: 105,
    resizeMode: "contain",
    top: 150,
    borderRadius: 200,
    borderColor: "#5C5C5C",
    borderWidth: 0.2,
  },

  profileImageText: {
    position: "absolute",
    top: 356,
    fontSize: 13,
    color: "#A1A1B3",
    left: 45,
  },

  profileBannerText: {
    position: "absolute",
    top: 356,
    fontSize: 13,
    color: "#A1A1B3",
    left: 240,
  },

  backButton: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 30,
    top: 70,
  },

  userBanner: {
    position: "absolute",
    top: 130,
    width: 130,
    height: 130,
    left: 240,
    borderRadius: 10,
    borderColor: "#5C5C5C",
    borderWidth: 0.2,
  },
  username: {
    position: "absolute",
    top: 300,
    left: 55,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  displayName: {
    top: 370,
    left: 55,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },

  bio: {
    top: 385,
    left: 55,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 60,
    paddingLeft: 30,
  },
});
