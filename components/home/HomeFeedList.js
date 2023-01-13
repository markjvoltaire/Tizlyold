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

export default function HomeFeedList({
  item,
  navigation,
  followingId,
  like,
  setLike,
}) {
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
