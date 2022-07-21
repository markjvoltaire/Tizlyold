import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import TopHeader from "../components/TopHeader";

export default function Subscriptions({ navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View>
      <TopHeader />
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
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
    backgroundColor: "white",
    alignSelf: "stretch",
  },
});
