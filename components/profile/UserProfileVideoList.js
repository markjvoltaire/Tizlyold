import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../home/UserButtons";
import CurrentUserButtons from "../home/CurrentUserButtons";
import PostHeader from "../home/PostHeader";
import ProfileHeader from "./ProfileHeader";

export default function UserProfileVideoPost({ item, user, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ paddingBottom: 90, bottom: 10 }}>
      <View style={{ alignSelf: "center", top: 52 }}>
        <ProfileHeader navigation={navigation} item={item} />
      </View>

      <Pressable
        onPress={() =>
          navigation.push("Player", {
            item,
          })
        }
      >
        <Video
          source={{ uri: item.media }}
          ref={video}
          style={{
            height: 400,
            aspectRatio: 1,
            borderRadius: 12,
            alignSelf: "center",
            top: 20,
          }}
          resizeMode="cover"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        <Image
          style={{
            position: "absolute",
            width: 60,
            top: 190,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("../../assets/playButton.png")}
        />
      </Pressable>

      <View style={{ top: 27, right: 10 }}>
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

      <CurrentUserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        navigation={navigation}
        item={item}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
