import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";

export default function ProfileMediaVideoList({ post }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View>
      <Video
        source={{ uri: post.media }}
        ref={video}
        style={{
          height: 260,
          width: 400,
          borderRadius: 12,
          alignSelf: "center",
        }}
        resizeMode="cover"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
