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

export default function UserProfileSubscribers({ navigation }) {
  const { user, setUser } = useUser();
  const [userPoints, setUserPoints] = useState();

  console.log("user", user);
  async function getUserPoints() {
    const userId = supabase.auth.currentUser.id;

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("tizlyPoints")
      .eq("user_id", userId);

    return profiles;
  }

  useEffect(() => {
    const getPoints = async () => {
      const resp = await getUserPoints();
      resp.map((i) => setUserPoints(i));
    };
    getPoints();
  }, []);

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

  return (
    <SafeAreaView>
      <Button title="access for 50 points" onPress={() => minusFiftyPoints()} />
      <Button title="go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
