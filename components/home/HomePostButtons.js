import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import { getAllLikes, likePost, unlikePost } from "../../services/user";
import { useLike } from "../../context/LikeContext";

export default function HomePostButtons({ item, navigation }) {
  const { user } = useUser();
  const [buttonActive, setButtonActive] = useState(false);

  const { likeList, setLikeList } = useLike(buttonActive);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setButtonActive((current) => !current);

    buttonActive === true ? unlikePost(item) : likePost(item, user);
  };

  // when i go to profile
  useEffect(() => {
    const seeLikes = async () => {
      const resp = await getAllLikes();
      setLikeList(resp);
      resp.map((post) => setIsPressed(post.liked));
      console.log("resp FROM HOME BUTTONS", resp);
    };
    seeLikes();
  }, [buttonActive]);

  //when i go back to home screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getLikes() {
        const resp = await getAllLikes();

        console.log("resp", resp);
        console.log("resp FROM UNSCUBSCRIBE", resp);
        resp.map((post) => setButtonActive(post.liked));

        return resp;
      }
      getLikes();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-evenly",
        paddingBottom: 20,
      }}
    >
      <TouchableOpacity onPress={() => handlePress()}>
        <Image
          style={{
            top: 30,
            height: 28,
            aspectRatio: 1,
          }}
          source={
            buttonActive === true
              ? require("../../assets/likedHeart.png")
              : require("../../assets/Heart.png")
          }
        />
      </TouchableOpacity>

      <TouchableOpacity>
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

      <TouchableOpacity onPress={() => console.log(item)}>
        <Image
          style={{
            top: 30,
            height: 28,
            aspectRatio: 1,
            resizeMode: "contain",
          }}
          source={require("../../assets/Bookmark.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
