import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import UserProfileHeader from "../profile/UserProfileHeader";
import UserButtons from "../home/UserButtons";
import PostHeader from "../home/PostHeader";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";

export default function Status({ item, navigation }) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const { user, setUser } = useUser();
  const userId = user.user_id;
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
    const unsubscribe = navigation.addListener("focus", () => {
      const seeLikes = async () => {
        const res = await getLikes();
        const saves = await getSaves();

        res.map((post) => setIsPressed(post.liked));
        saves.map((save) => setSaveIsPressed(save.saved));

        if (res.length === 0) {
          setIsPressed(false);
        }

        if (saves.length === 0) {
          setSaveIsPressed(false);
        }
      };
      seeLikes();
    });
    return unsubscribe;
  }, [navigation]);

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: 390,
        alignSelf: "center",
        top: height * 0.07,
      }}
    />
  );
  return (
    <View style={{ paddingBottom: 90, top: 10 }}>
      <View style={{ alignSelf: "center", top: height * 0.04, right: 20 }}>
        <PostHeader navigation={navigation} item={item} />
      </View>

      <View style={{ top: height * 0.01 }}>
        <Text
          style={{
            top: 12,
            fontWeight: "500",
            textAlign: "center",
            width: 390,
            fontSize: 17,
            paddingBottom: 30,
            lineHeight: 20,
          }}
        >
          {item.description}
        </Text>
      </View>
      <UserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        item={item}
        navigation={navigation}
      />

      <FullSeperator />
    </View>
  );
}

const styles = StyleSheet.create({});
