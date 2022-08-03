import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";
import PostDetailsVideos from "./PostDetailsVideos";
import PostDetailsPhotos from "./PostDetailsPhotos";
import PostDetailsComments from "./PostDetailsComments";

export default function PostNavigator({ postUserId, displayName }) {
  const [navigator, setNavigator] = useState("videos");

  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const FullSeperatorBottom = () => <View style={styles.fullSeperatorBottom} />;

  console.log("postUserId from navigator", postUserId);

  return (
    <View style={styles.container}>
      <View style={{ right: 60 }}>
        <Button
          color="#707790"
          onPress={() => setNavigator("videos")}
          title="Videos"
        />
      </View>
      <View>
        <Button
          color="#707790"
          onPress={() => setNavigator("photos")}
          title="Photos"
        />
      </View>
      <View style={{ left: 60 }}>
        <Button
          color="#707790"
          onPress={() => setNavigator("comments")}
          title="Comments"
        />
      </View>

      {navigator === "videos" ? (
        <PostDetailsVideos
          displayName={displayName}
          postUserId={postUserId}
          navigator={navigator}
        />
      ) : navigator === "photos" ? (
        <PostDetailsPhotos
          displayName={displayName}
          postUserId={postUserId}
          navigator={navigator}
        />
      ) : (
        <PostDetailsComments
          displayName={displayName}
          postUserId={postUserId}
          navigator={navigator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  fullSeperator: {
    position: "absolute",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
    width: 600,
    bottom: 45,
  },
  fullSeperatorBottom: {
    position: "absolute",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
    width: 600,
    top: 47,
  },
});
