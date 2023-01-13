import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import React, { useState, useEffect } from "react";
import UserButtons from "./UserButtons";

import CurrentUserButtons from "./CurrentUserButtons";
import { useUser } from "../../context/UserContext";
import PostHeader from "./PostHeader";
import { supabase } from "../../services/supabase";

export default function VideoPost({ item, navigation, route }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const { user, setUser } = useUser();

  const userId = user.user_id;

  async function getLikes() {
    const resp = await supabase
      .from("likes")
      .select("*")
      .eq("userId", userId)
      .eq("postId", item.id)
      .eq("liked_Id", item.likeId);

    return resp.body;
  }

  async function getSaves() {
    const resp = await supabase
      .from("saves")
      .select("*")
      .eq("userId", userId)
      .eq("postId", item.id)
      .eq("saved_Id", item.saved_Id);

    return resp.body;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const seeLikes = async () => {
        const res = await getLikes();
        const saves = await getSaves();

        res.map((post) => setIsPressed(post.liked));
        saves.map((save) => setSaveIsPressed(save.saved));

        if (res.length === 0) {
          setIsPressed(false);
        }

        if (saves.length === 0) {
          setSaveIsPressed(false);
        }
      };
      seeLikes();
    });
    return unsubscribe;
  }, [navigation]);

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <View style={{ top: height * 0.01 }}>
      <View style={{ paddingBottom: height * 0.01 }}>
        <PostHeader navigation={navigation} item={item} />
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
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    bottom: 45,
  },
});
