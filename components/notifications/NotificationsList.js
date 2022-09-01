import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { get } from "lodash";

export default function NotificationsList({ notifications, item }) {
  const [image, setImage] = useState();

  const getPost = async () => {
    const userId = supabase.auth.currentUser.id;

    const post = await supabase
      .from("post")
      .select("media")
      .eq("id", item.postId);

    return post;
  };

  useEffect(() => {
    const getPhoto = async () => {
      const resp = await getPost();
      const photo = resp.body;
      console.log("photo", photo);
      photo.map((pic) => setImage(pic.media));
    };
    getPhoto();
  }, []);

  return (
    <View style={{ paddingBottom: 40 }}>
      <Image
        style={{ height: 40, width: 40, borderRadius: 100 }}
        source={{ uri: item.userProfileImage }}
      />
      <View style={{ bottom: 40 }}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            position: "absolute",
            left: 60,
          }}
        >
          Like
        </Text>
        <Image
          style={{ height: 20, width: 20, top: 23, left: 22 }}
          source={require("../../assets/likedHeart.png")}
        />

        <Text
          style={{
            fontSize: 16,
            position: "absolute",
            left: 60,
            top: 20,
            fontWeight: "600",
            color: "#4F4E4E",
          }}
        >
          {item.userUsername} Liked your post
        </Text>

        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 10,
            position: "absolute",
            marginBottom: 10,
            left: 300,
          }}
          source={{ uri: image }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
