import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";
import PostDetailsVideos from "./PostDetailsVideos";
import PostDetailsPhotos from "./PostDetailsPhotos";
import PostDetailsComments from "./PostDetailsComments";

export default function PostNavigator({ creatorDisplayName, postUserId }) {
  const [navigator, setNavigator] = useState("videos");

  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const FullSeperatorBottom = () => <View style={styles.fullSeperatorBottom} />;

  return (
    <View style={styles.container}>
      <FullSeperator />
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
          postUserId={postUserId}
          creatorDisplayName={creatorDisplayName}
          navigator={navigator}
        />
      ) : navigator === "photos" ? (
        <PostDetailsPhotos
          postUserId={postUserId}
          creatorDisplayName={creatorDisplayName}
          navigator={navigator}
        />
      ) : (
        <PostDetailsComments
          postUserId={postUserId}
          creatorDisplayName={creatorDisplayName}
          navigator={navigator}
        />
      )}
      <FullSeperatorBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 370,
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
