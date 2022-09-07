import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

export default function CurrentUserButtons({
  item,
  isPressed,
  setIsPressed,
  saveIsPressed,
  setSaveIsPressed,
  post,
  navigation,
}) {
  const { user } = useUser();

  const createThreeButtonAlert = () =>
    Alert.alert("Post Options", " ", [
      {
        text: "Edit Post",
        onPress: () =>
          navigation.navigate("EditPost", {
            user_id: item.user_id,
            description: item.description,
            title: item.title,
            id: item.id,
          }),
      },
      {
        text: "Cancel",

        onPress: () => null,
        type: "cancel",
      },
    ]);

  const userId = user.user_id;
  const postId = item.id;

  async function likePost() {
    const resp = await supabase.from("likes").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        userProfileImage: user.profileimage,
        postId: item.id,
        userUsername: user.username,
        creatorUsername: item.username,
        liked_Id: item.likeId,
        creatorDisplayname: item.displayName,
        userDisplayname: user.displayName,
        creatorProfileImage: item.profileimage,
      },
    ]);

    return resp;
  }

  async function savePost() {
    const resp = await supabase.from("saves").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        userProfileImage: user.profileimage,
        postId: item.id,
        userUsername: user.username,
        creatorUsername: item.username,
        saved_Id: item.saved_Id,
        creatorDisplayname: item.displayName,
        userDisplayname: user.displayName,
        creatorProfileImage: item.profileimage,
      },
    ]);

    return resp;
  }

  async function unSavePost() {
    const resp = await supabase
      .from("saves")
      .delete()
      .eq("postId", postId)
      .eq("saved_Id", item.saved_Id);
    return resp;
  }

  async function unlikePost() {
    const resp = await supabase
      .from("likes")
      .delete()
      .eq("postId", postId)
      .eq("liked_Id", item.likeId);
    return resp;
  }

  async function getLikes() {
    const resp = await supabase
      .from("likes")
      .select("*")
      .eq("userId", userId)
      .eq("postId", item.id)
      .eq("liked_Id", item.likeId);

    return resp.body;
  }

  async function getSaves() {
    const resp = await supabase
      .from("saves")
      .select("*")
      .eq("userId", userId)
      .eq("postId", item.id)
      .eq("saved_Id", item.saved_Id);

    return resp.body;
  }

  useEffect(() => {
    const seeLikes = async () => {
      const res = await getLikes();
      res.map((post) => setIsPressed(post.liked));
    };
    seeLikes();
  }, []);

  useEffect(() => {
    const seeSaves = async () => {
      const res = await getSaves();
      res.map((i) => setSaveIsPressed(i.saved));
    };
    seeSaves();
  }, []);

  const handlePress = () => {
    setIsPressed((current) => !current);

    isPressed === true ? unlikePost() : likePost();
  };

  const handleSavePress = () => {
    setSaveIsPressed((current) => !current);

    saveIsPressed === true ? unSavePost() : savePost();
  };
  return (
    <View style={styles.userButtonsContainer}>
      <View style={styles.likeButtonContainer}>
        <TouchableOpacity onPress={() => handlePress()}>
          <Image
            style={{
              top: 30,
              height: 28,
              aspectRatio: 1,
            }}
            source={
              isPressed === true
                ? require("../../assets/likedHeart.png")
                : require("../../assets/Heart.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CommentScreen", { item })}
        >
          <Image
            style={{
              top: 30,
              height: 28,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
            source={require("../../assets/Chat.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity onPress={() => handleSavePress()}>
          <Image
            style={{
              top: 30,
              height: 28,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
            source={
              saveIsPressed === true
                ? require("../../assets/BookmarkSaved.png")
                : require("../../assets/Bookmark.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{ right: 45 }}>
        <TouchableOpacity onPress={() => createThreeButtonAlert()}>
          <Image
            style={{
              resizeMode: "contain",
              position: "absolute",
              height: 28,
              top: 30,
            }}
            source={require("../../assets/moreCircle.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userButtonsContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
});
