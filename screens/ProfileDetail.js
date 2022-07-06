import { View, Text, TouchableOpacity, Image, sty } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import React from "react";

export default function ProfileDetail({ navigation }) {
  const linkTo = useLinkTo();

  console.log("linkTo", linkTo);
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../assets/backButton.png")} />
      </TouchableOpacity>
    </View>
  );
}
