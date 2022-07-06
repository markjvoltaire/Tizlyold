import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";

export default function EditProfile({ navigation }) {
  const { user, setUser } = useUser();

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={styles.pageTitle}>Edit Profile</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <Image style={styles.logo} source={require("../assets/TizlyBig.png")} />

      <View style={styles.imagesAndInputs}>
        <Text style={styles.profileImageText}>Change Profile Image</Text>

        <Text style={styles.profileBannerText}>Change Profile Banner</Text>

        <Image
          style={styles.verticleDiv}
          source={require("../assets/verticleDiv.png")}
        />

        <View style={styles.userImages}>
          <Image
            style={styles.profileImage}
            source={{
              uri: user.profileimage,
            }}
          />

          <Image
            style={styles.userBanner}
            source={{
              uri: user.bannerImage,
            }}
          />
        </View>

        <View style={styles.inputs}>
          <TextInput placeholder="Username" style={styles.username} />
          <TextInput placeholder="Display Name" style={styles.displayName} />
          <TextInput placeholder="Bio" style={styles.bio} />
        </View>
      </View>

      <Image
        style={styles.button}
        source={require("../assets/continueButton.png")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 311,
    height: 50,
    left: 52,
    top: 790,
  },

  holder: {
    height: 52,
    Bordercolor: "red",
  },

  imagesAndInputs: {
    bottom: 10,
  },

  logo: {
    position: "absolute",
    resizeMode: "contain",
    height: 39,
    width: 80,
    top: 60,
    left: 170,
  },

  pageTitle: {
    position: "absolute",
    fontSize: 25,
    top: 140,
    left: 30,
  },

  verticleDiv: {
    position: "absolute",
    top: 200,
    left: 190,
    height: 120,
  },

  inputs: {
    position: "absolute",
    top: 140,
  },
  userImages: {
    position: "absolute",
    top: 60,
  },

  profileImage: {
    position: "absolute",
    left: 50,
    width: 105,
    height: 105,
    resizeMode: "contain",
    top: 150,
    borderRadius: 200,
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
    top: 20,
  },

  userBanner: {
    position: "absolute",
    top: 130,
    width: 130,
    height: 130,
    left: 240,
  },
  username: {
    position: "absolute",
    top: 300,
    left: 55,
    borderRadius: 25,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  displayName: {
    top: 380,
    left: 55,
    borderRadius: 25,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },

  bio: {
    top: 410,
    left: 55,
    borderRadius: 25,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 100,
    paddingLeft: 30,
  },
});
