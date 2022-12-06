import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Video } from "expo-av";
import UserButtons from "../home/UserButtons";
import { useUser } from "../../context/UserContext";
import PostHeader from "../home/PostHeader";
import ProfilePostHeader from "../post/ProfilePostHeader";

export default function ProfileVideoPost({ item, navigation, userInfo }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
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

  const { user, setUser } = useUser();

  let height = Dimensions.get("window").height;

  console.log("video", video.current);

  return (
    <>
      <View style={{ top: 10 }}>
        <View style={{ alignSelf: "center", top: height * 0.001 }}>
          <ProfilePostHeader item={item} />
        </View>
        <Pressable
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync() &&
                video.current.presentFullscreenPlayer() &&
                video.current.isPlaying
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

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.3,
    width: 390,
    alignSelf: "center",
  },
});
