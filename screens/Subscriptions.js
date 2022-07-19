import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";
import DropDownPicker from "react-native-dropdown-picker";
import { Video, AVPlaybackStatus } from "expo-av";
import { supabase } from "../services/supabase";

export default function Subscriptions({ navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
  },
  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 270.7,
    width: 29,
    height: 29,
  },
  pageTitle: {
    alignItems: "center",
    bottom: 200,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
