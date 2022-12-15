import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import UserProfileHeader from "./UserProfileHeader";
import CurrentUserButtons from "../home/CurrentUserButtons";
import ProfilePostHeader from "../post/ProfilePostHeader";

export default function ProfileTextPost({ user, setUser, navigation, item }) {
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: 390,
        alignSelf: "center",
        top: height * 0.07,
      }}
    />
  );
  return (
    <View style={{ paddingBottom: 90, bottom: 10 }}>
      <View style={{ alignSelf: "center", top: height * 0.04 }}>
        <ProfilePostHeader item={item} />
      </View>

      <View style={{ top: height * 0.01 }}>
        <Text
          style={{
            top: 12,
            fontWeight: "500",
            textAlign: "center",
            width: 390,
            fontSize: 17,
            paddingBottom: 30,
            lineHeight: 20,
          }}
        >
          {item.description}
        </Text>
      </View>

      <View style={{ bottom: height * 0.002 }}>
        <CurrentUserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
          navigation={navigation}
          item={item}
        />
      </View>
      <FullSeperator />
    </View>
  );
}

const styles = StyleSheet.create({});
