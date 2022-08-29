import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import { FlatList } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";
import { getPosts, getFollowing } from "../../services/user";

export default function UserButtons({
  item,
  isPressed,
  setIsPressed,
  saveIsPressed,
  setSaveIsPressed,
}) {
  const [likedPosts, setLikedPosts] = useState();
  const [loading, setLoading] = useState(true);
  // const [isPressed, setIsPressed] = useState(false);

  const { user } = useUser();

  const creatorId = item.user_id;
  const creatorUsername = item.username;
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
      .update({ saved: false })
      .eq("postId", postId)
      .eq("saved_Id", item.saved_Id);
    return resp;
  }

  async function unlikePost() {
    const resp = await supabase
      .from("likes")
      .update({ liked: false })
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
      res.map((post) => setSaveIsPressed(post.saved));
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
              height: 32,
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
        <TouchableOpacity onPress={() => getFollowing()}>
          <Image
            style={{
              top: 30,
              height: 32,
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
              height: 32,
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
