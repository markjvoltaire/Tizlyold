import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

export default function ProfileUserButtons({
  item,
  route,
  isPressed,
  setIsPressed,
}) {
  const [loading, setLoading] = useState(true);
  //   const [isPressed, setIsPressed] = useState(false);
  const [like, setLike] = useState();
  const [likeFromSB, setLikeFromSB] = useState();

  const { user } = useUser();

  //   console.log("item from profile user buttons", item);
  //   console.log("route from profile user buttons", route);

  const creatorId = item.user_id;
  const creatorUsername = item.username;
  const userId = user.user_id;
  const postId = item.id;

  //   console.log("item", item);
  async function checkLikes() {
    const likes = await supabase
      .from("likes")
      .select("*")
      .eq("postId", item.id)
      .eq("liked_Id", item.likeId);
    likes.body.map((i) => setLike(i));

    return like;
  }

  async function likePost() {
    checkLikes();

    const resp = await supabase.from("likes").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        userProfileImage: user.profileimage,
        postId: item.id,
        userUsername: user.username,
        creatorUsername: item.username,
        liked_Id: item.likeId,
      },
    ]);

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

  async function likeOldPost() {
    const resp = await supabase
      .from("likes")
      .update({ liked: true })
      .eq("postId", postId)
      .eq("liked_Id", item.likeId)
      .eq("userId", userId);
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

  useEffect(() => {
    const seeLikes = async () => {
      const res = await getLikes();
      res.map((post) => setIsPressed(post.liked));
    };
    seeLikes();
  }, []);

  const handlePress = async () => {
    setIsPressed((current) => !current);

    const resp = await getLikes();

    resp.map((i) => setLikeFromSB(i.liked));

    console.log("likeFromSB", likeFromSB);

    // if (likeFromSB ===)

    isPressed === true ? unlikePost() : likePost();
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
              isPressed === false
                ? require("../../assets/Heart.png")
                : require("../../assets/likedHeart.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButtonContainer}>
        <TouchableOpacity onPress={() => likeOldPost()}>
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
        <TouchableOpacity
          onPress={() => console.log("isPressed from Profile User", isPressed)}
        >
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
            source={require("../../assets/Bookmark.png")}
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
