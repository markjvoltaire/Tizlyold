import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import UserProfile from "../screens/UserProfile";
import ProfileNav from "../components/profile/ProfileNav";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";

export default function ProfileDetail({ navigation, route }) {
  const { user, setUser } = useUser();
  const currentUserId = user.id;
  const profileDetailUser = route.params.id;


  if (currentUserId === profileDetailUser) {
    navigation.navigate("UserProfile");
  }

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

      <View style={styles.userinfoContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: route.params.profileimage }}
        />
        <Text style={styles.displayname}>{route.params.displayName}</Text>
        <Text style={styles.username}>@{route.params.username}</Text>
        <Text style={styles.bio}>{route.params.bio}</Text>
      </View>
      <ProfileNav />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton2.png")}
        />
      </TouchableOpacity>
      <View style={styles.paywall}>
        <View style={styles.photosDiv}>
          <Image
            style={styles.photoBox}
            source={require("../assets/subBox.png")}
          />
          <Text style={styles.photosTextTitle}>Photos</Text>
          <Text style={styles.photosLength}>18</Text>
        </View>
        <View style={styles.videosDiv}>
          <Image
            style={styles.videosBox}
            source={require("../assets/subBox.png")}
          />
          <Text style={styles.videosTextTitle}>Videos</Text>
          <Text style={styles.videosLength}>32</Text>
        </View>
        <View style={styles.wrapsDiv}>
          <Image
            style={styles.wrapBox}
            source={require("../assets/subBox.png")}
          />
          <Text style={styles.wrapsTextTitle}>Audio</Text>
          <Text style={styles.wrapsLength}>9</Text>
        </View>

        <TouchableOpacity>
          <Image
            style={styles.followbutton}
            source={require("../assets/followbutton.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.subscribeButton}
            source={require("../assets/subscribe.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log(route.path)}>
          <Image
            style={styles.accessButton}
            source={require("../assets/accessButton.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
    fontSize: 15,
    width: 400,
    top: 320,
    left: 8,
    fontWeight: "800",
  },
  followbutton: {
    position: "absolute",
    resizeMode: "contain",
    width: 100,
    left: 10,
    top: 360,
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
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    top: 90,
  },
  photoBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 20,
  },
  videosBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 165,
  },
  wrapBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 305,
  },
  testButton: {
    position: "absolute",
  },
  paywall: {
    position: "absolute",
  },
  photosDiv: {
    position: "absolute",
  },
  videosDiv: {
    position: "absolute",
  },
  wrapsDiv: {
    position: "absolute",
  },

  subscribeButton: {
    position: "absolute",
    resizeMode: "contain",
    top: 360,
    width: 120,
    left: 130,
  },

  photosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 45,
  },
  videosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 190,
  },
  wrapsTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 330,
  },
  photosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 55,
  },
  videosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 200,
  },
  wrapsLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 350,
  },
  accessButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 190,
    height: 61,
    top: 720,
    left: 120,
  },
  userinfoContainer: {
    top: 30,
  },
});
