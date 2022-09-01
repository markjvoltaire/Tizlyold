import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileMediaImageList from "./ProfileMediaImageList";
import ProfileMediaVideoList from "./ProfileMediaVideoList";

export default function ProfileMediaView({ post }) {
  if (post.mediaType === "image") {
    return (
      <View>
        <ProfileMediaImageList post={post} />
      </View>
    );
  }

  if (post.mediaType === "video") {
    return (
      <View>
        <ProfileMediaVideoList post={post} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
