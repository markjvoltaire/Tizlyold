import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../home/UserButtons";
import ProfileHeader from "./ProfileHeader";
import { useUser } from "../../context/UserContext";
import PostSkeleton from "./PostSkeleton";

export default function ProfileVideoPost({ item, navigation, userInfo }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const { user, setUser } = useUser();

  const milliseconds = status.durationMillis;

  return (
    <View style={{ paddingBottom: 90, top: 10.5 }}>
      <View style={{ top: 10 }}>
        <View style={{ alignSelf: "center", right: 20, top: 40 }}>
          <ProfileHeader
            userInfo={userInfo}
            navigation={navigation}
            item={item}
          />
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
          <View style={{ alignSelf: "center" }}>
            <PostSkeleton />
          </View>

          <Video
            source={{ uri: item.media }}
            ref={video}
            style={{
              height: 398,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />

          <Image
            style={{
              alignSelf: "center",
              resizeMode: "stretch",
              height: 180,
              width: 400,
              top: 219,
              borderRadius: 12,
              position: "absolute",
            }}
            source={require("../../assets/fader.png")}
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
              fontWeight: "700",
              color: "#4F4E4E",
              textAlign: "left",
              width: 390,
              paddingBottom: 30,
              lineHeight: 20,
            }}
          >
            {item.description}
          </Text>

          <View>
            <Image
              resizeMode="contain"
              style={{ width: 70, left: 10, bottom: 10 }}
              source={require("../../assets/videoBean.png")}
            />
          </View>
        </View>

        <View style={{ bottom: 40 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.3,
    width: 390,
    alignSelf: "center",
    top: 60,
  },
});
