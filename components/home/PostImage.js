import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";

import UserButtons from "./UserButtons";

import { useUser } from "../../context/UserContext";

export default function PostImage({ navigation, item }) {
  const { user, setUser } = useUser();
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  return (
    <>
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.push("ImageDetails", { item })}
      >
        <SharedElement id={item.id}>
          <Image
            style={{
              height: 398,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
              bottom: 50,
              borderColor: "#5C5C5C",
              borderWidth: 0.2,
            }}
            source={{ uri: item.media }}
            resizeMode="cover"
          />
        </SharedElement>
      </TouchableOpacity>
      <View style={{ bottom: 50 }}>
        <Text
          style={{
            left: 13,
            top: 12,
            fontWeight: "700",
            textAlign: "left",
            width: 390,
            paddingBottom: 6,
            lineHeight: 20,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            left: 13,
            top: 12,
            fontWeight: "600",
            color: "#4F4E4E",
            textAlign: "left",
            width: 390,
            paddingBottom: 30,
            lineHeight: 20,
          }}
        >
          {item.description}
        </Text>

        <Image
          resizeMode="contain"
          style={{ width: 70, left: 10, bottom: 30 }}
          source={require("../../assets/photoBean.png")}
        />
      </View>
      <View style={{ bottom: 90 }}>
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
    </>
  );
}

const styles = StyleSheet.create({});
