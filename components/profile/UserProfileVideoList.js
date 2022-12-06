import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../home/UserButtons";
import CurrentUserButtons from "../home/CurrentUserButtons";
import PostHeader from "../home/PostHeader";
import ProfileHeader from "./ProfileHeader";
import UserProfileHeader from "./UserProfileHeader";

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

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <View style={{ paddingBottom: 90, bottom: 10 }}>
      <View style={{ alignSelf: "center", top: height * 0.04 }}>
        <UserProfileHeader navigation={navigation} item={item} />
      </View>

      <Pressable
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync() &&
              video.current.presentFullscreenPlayer()
        }
      >
        <Video
          source={{ uri: item.media }}
          ref={video}
          isLooping
          style={{
            height: height * 0.452,
            aspectRatio: 1,
            borderRadius: 12,
            alignSelf: "center",
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

      <View style={{ top: height * 0.01 }}>
        <Text
          style={{
            left: width * 0.03,
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

      <View style={{ bottom: height * 0.005 }}>
        <CurrentUserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
          navigation={navigation}
          item={item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
