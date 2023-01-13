import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { useUser } from "../../context/UserContext";
import ProfilePostHeader from "../post/ProfilePostHeader";
import UserButtons from "./UserButtons";
import CurrentUserButtons from "./CurrentUserButtons";
import HomePostHeader from "../post/HomePostHeader";

export default function HomeVideoPost({ navigation, item }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const { user, setUser } = useUser();

  let height = Dimensions.get("window").height;

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: 390,
        alignSelf: "center",
        bottom: height * 0.03,
      }}
    />
  );

  return (
    <>
      <View style={{ top: 10 }}>
        <View style={{ alignSelf: "center", top: height * 0.001 }}>
          <HomePostHeader navigation={navigation} item={item} />
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("Player", {
              id: item.id,
              username: item.username,
              profileimage: item.profileimage,
              displayName: item.displayName,
              user_id: item.user_id,
              item,
            })
          }
        >
          <Video
            source={{ uri: item.media }}
            ref={video}
            style={{
              height: height * 0.454,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />

          <Image
            style={{
              position: "absolute",
              width: 50,
              top: 160,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={require("../../assets/playButton.png")}
          />
        </Pressable>

        <View style={{ paddingBottom: 30 }}>
          <Text
            style={{
              left: 13,
              top: 12,
              fontWeight: "700",
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
            source={require("../../assets/videoBean.png")}
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

        <FullSeperator />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
