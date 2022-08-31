import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserButtons from "./UserButtons";
import { Video, AVPlaybackStatus } from "expo-av";
import { StackActions } from "@react-navigation/native";
import { getPosts, getFollowing } from "../../services/user";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import { fromPairs } from "lodash";
import { useFollow } from "../../context/FollowContext";
import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";
import TrendingCreators from "../explore/TrendingCreators";

export default function HomeFeedList({ item, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { user, setUser } = useUser();
  const pushAction = StackActions.replace("HomeScreen");
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const { follow, setFollow } = useFollow();

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  if (item.mediaType === "image") {
    return <ImagePost item={item} navigation={navigation} />;
  }

  if (item.mediaType === "video") {
    return <VideoPost navigation={navigation} item={item} />;
  }

  if (item.mediaType === "text") {
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        const userId = supabase.auth.currentUser.id;
        async function getAllLikes() {
          const res = await supabase
            .from("likes")
            .select("*")
            .eq("userId", userId)
            .eq("postId", item.id)
            .eq("liked_Id", item.likeId);

          res.body.map((like) => setIsPressed(like.liked));

          return res.body;
        }
        getAllLikes();
      });
      return unsubscribe;
    }, [navigation]);

    return (
      <View style={{ paddingBottom: 40 }}>
        <View style={{ alignSelf: "center", paddingBottom: 45, left: 25 }}>
          <Pressable
            onPress={() =>
              navigation.navigate("ProfileDetail", {
                user_id: item.user_id,
                bannerImage: item.bannerImage,
                username: item.username,
                displayName: item.displayName,
                profileimage: item.profileimage,
                bio: item.bio,
              })
            }
          >
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                right: 55,
                top: 37,
              }}
              source={{ uri: item.profileimage }}
            />
            <Text
              style={{
                right: 6,
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "gilroy",
              }}
            >
              {item.displayName}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color: "#73738B",
                right: 5,
              }}
            >
              @{item.username}
            </Text>
          </Pressable>
        </View>
        <View style={{ alignSelf: "center", width: 400 }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 16,
              lineHeight: 27,
              paddingBottom: 40,
              alignSelf: "center",
            }}
          >
            {item.description}
          </Text>
        </View>
        <UserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
          item={item}
        />
        <FullSeperator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    left: 1,
    top: 40,
    height: 3,
  },
});
