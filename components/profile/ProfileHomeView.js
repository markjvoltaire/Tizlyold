import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserProfileFeed from "./UserProfileFeed";
import UserProfileImagePost from "./UserProfileImagePost";
import UserProfileVideoPost from "./UserProfileVideoList";

export default function ProfileHomeView({
  item,
  posts,
  route,
  navState,
  setPosts,
  navigation,
  post,
}) {
  console.log("posts", post);
  if (post.mediaType === "image") {
    return <UserProfileImagePost navigation={navigation} post={post} />;
  }

  if (post.mediaType === "video") {
    return <UserProfileVideoPost navigation={navigation} post={post} />;
  }
}

const styles = StyleSheet.create({});
