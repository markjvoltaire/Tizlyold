import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import UserButtons from "../components/home/UserButtons";
import { getAllLikes } from "../services/user";
import { useLike } from "../context/LikeContext";

export default function PostActivity({ item }) {
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const [postList, setPostList] = useState([]);

  const { likeList, setLikeList } = useLike();

  useEffect(() => {
    const getLikes = async () => {
      const resp = await getAllLikes();
      setLikeList(resp);
    };
    getLikes();
  }, []);

  return (
    <View>
      <UserButtons
        setIsPressed={setIsPressed}
        isPressed={isPressed}
        item={item}
        likeList={likeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
