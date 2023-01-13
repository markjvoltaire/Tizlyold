import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import ProfilePostHeader from "../post/ProfilePostHeader";
import StatusText from "../post/StatusText";
import UserButtons from "./UserButtons";
import HomePostHeader from "../post/HomePostHeader";
import { useUser } from "../../context/UserContext";
import CurrentUserButtons from "./CurrentUserButtons";

export default function HomeStatusPost({ item, navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const { user, setUser } = useUser();

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: 390,
        alignSelf: "center",
        top: height * 0.025,
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
      <View style={{ paddingBottom: height * 0.01, top: height * 0.02 }}>
        <HomePostHeader navigation={navigation} item={item} />
      </View>

      <View style={{ paddingBottom: height * 0.06 }}>
        <StatusText item={item} />
      </View>

      <View style={{ bottom: height * 0.04 }}>
        {item.user_id === user.user_id ? (
          <CurrentUserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            saveIsPressed={saveIsPressed}
            setSaveIsPressed={setSaveIsPressed}
            navigation={navigation}
            item={item}
          />
        ) : (
          <UserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            saveIsPressed={saveIsPressed}
            setSaveIsPressed={setSaveIsPressed}
            item={item}
            navigation={navigation}
          />
        )}
      </View>
      <FullSeperator />
    </View>
  );
}

const styles = StyleSheet.create({});
