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
import AnimatedBottomSheet from "../components/home/AnimatedBottomSheet";

export default function UserProfileSubscribers({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPoints, setUserPoints] = useState();

  async function resetFunction() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://example.com/update-password",
    });
  }

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <SafeAreaView>
      <Button title="hello" />
    </SafeAreaView>
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
    top: 90,
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
