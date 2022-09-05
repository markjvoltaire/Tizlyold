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
  user,
  setUser,
}) {
  if (post.mediaType === "image") {
    return (
      <UserProfileImagePost
        user={user}
        setUser={setUser}
        navigation={navigation}
        post={post}
      />
    );
  }

  if (post.mediaType === "video") {
    return (
      <UserProfileVideoPost
        user={user}
        setUser={setUser}
        navigation={navigation}
        post={post}
      />
    );
  }
}

const styles = StyleSheet.create({});
