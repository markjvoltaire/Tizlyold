import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserProfileFeed from "./UserProfileFeed";
import UserProfileImagePost from "./UserProfileImagePost";
import UserProfileVideoPost from "./UserProfileVideoList";

import CurrentUserTextPost from "./CurrentUserTextPost";

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
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  if (post.mediaType === "image") {
    return (
      <>
        <UserProfileImagePost
          user={user}
          setUser={setUser}
          navigation={navigation}
          post={post}
        />
        <FullSeperator />
      </>
    );
  }

  if (post.mediaType === "video") {
    return (
      <>
        <UserProfileVideoPost
          user={user}
          setUser={setUser}
          navigation={navigation}
          item={post}
        />
        <FullSeperator />
      </>
    );
  }

  if (post.mediaType === "status") {
    return (
      <View style={{ bottom: 95 }}>
        <CurrentUserTextPost
          user={user}
          setUser={setUser}
          navigation={navigation}
          item={post}
        />
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
    bottom: 80,
    position: "absolute",
  },
});
