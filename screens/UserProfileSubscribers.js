import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Animated,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Permissions, Contacts } from "expo-permissions";
import React, { useRef, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../services/supabase";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import TopHeader from "../components/TopHeader";
import { useUser } from "../context/UserContext";
import LottieView from "lottie-react-native";

export default function UserProfileSubscribers({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPoints, setUserPoints] = useState();

  const { item } = route.params;

  // async function getUserPoints() {
  //   const userId = supabase.auth.currentUser.id;

  //   const { data: profiles, error } = await supabase
  //     .from("profiles")
  //     .select("tizlyPoints")
  //     .eq("user_id", userId);

  //   return profiles;
  // }

  // useEffect(() => {
  //   const getPoints = async () => {
  //     const resp = await getUserPoints();
  //     resp.map((i) => setUserPoints(i));
  //   };
  //   getPoints();
  // }, []);

  // const test = () => {
  //   const resp = userPoints.tizlyPoints - 50;
  //   console.log("resp", resp);
  // };

  // async function minusFiftyPoints() {
  //   userPoints.tizlyPoints - 50 < 0
  //     ? Alert.alert("not enough")
  //     : console.log("you have enough");

  //   const userId = supabase.auth.currentUser.id;
  //   const { data: profiles, error } = await supabase
  //     .from("profiles")
  //     .update({ tizlyPoints: userPoints.tizlyPoints - 50 })
  //     .eq("user_id", userId);

  //   return profiles;
  // }

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <View>
      <SharedElement id={item.id}>
        <Image style={styles.userBanner} source={{ uri: item.profileimage }} />
      </SharedElement>
      <SharedElement id={item.id}>
        <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 455,
            width: 445,

            borderRadius: 12,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../assets/fader.png")}
        />
      </SharedElement>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton2.png")}
        />
      </TouchableOpacity>
      <View style={{ top: 60, right: 62 }}>
        <Text style={styles.displayname}>{item.displayName}</Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: 417,
          height: 464,
          borderRadius: 25,
          top: 385,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            top: 30,
            fontWeight: "700",
            color: "#4F4E4E",
            fontSize: 18,
            position: "absolute",
          }}
        >
          Subscriptions Details
        </Text>
        <FullSeperator />

        <Image
          resizeMode="contain"
          style={{ alignSelf: "center", top: 350, height: 50 }}
          source={require("../assets/buttonBlue.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.3,
    width: 300,
    alignSelf: "center",
    left: 1,
    top: 90,
  },

  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    top: 40,
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
});
