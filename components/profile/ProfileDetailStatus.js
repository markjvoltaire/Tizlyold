import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";
import ProfilePostHeader from "../post/ProfilePostHeader";
import StatusText from "../post/StatusText";

export default function ProfileDetailStatus({ item, navigation }) {
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
        <UserButtons
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
