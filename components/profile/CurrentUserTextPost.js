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
import StatusText from "../post/StatusText";

export default function CurrentUserTextPost({
  user,
  setUser,
  navigation,
  item,
}) {
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
        borderBottomEndRadius: 100,
      }}
    />
  );
  return (
    <View
      style={{
        width: width * 0.95,
        alignSelf: "center",
        paddingBottom: height * 0.04,
      }}
    >
      <View style={{ paddingBottom: height * 0.01 }}>
        <ProfilePostHeader item={item} />
      </View>

      <View style={{ paddingBottom: height * 0.06 }}>
        <StatusText item={item} />
      </View>

      <View style={{ bottom: height * 0.04 }}>
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
