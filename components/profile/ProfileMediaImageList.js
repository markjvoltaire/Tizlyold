import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function ProfileMediaImageList({ post }) {
  console.log("post", post);
  return (
    <View>
      <Image style={{ height: 20, width: 20 }} source={{ uri: post.media }} />
    </View>
  );
}

const styles = StyleSheet.create({});
