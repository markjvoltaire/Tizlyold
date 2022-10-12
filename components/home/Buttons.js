import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import { getAllLikes, likePost, unlikePost } from "../../services/user";
import { useLike } from "../../context/LikeContext";
import HomePostButtons from "./HomePostButtons";

export default function Buttons({ item, navigation }) {
  const { user } = useUser();
  const [buttonActive, setButtonActive] = useState(false);
  const [isPressed, setIsPressed] = useState();

  const { likeList, setLikeList } = useLike();
  const [likeInstance, setLikeInstance] = useState();

  useEffect(() => {
    const seeLikes = async () => {
      const resp = await getAllLikes();
      setLikeList(resp);
      resp.map((post) => setButtonActive(post.liked));
      console.log("resp FROM BUTONS", resp);
    };
    seeLikes();
  }, [buttonActive]);

  return (
    <View>
      <HomePostButtons navigation={navigation} item={item} />

      {/* <Buttons navigation={navigation} item={item} /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
