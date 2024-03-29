import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { get } from "lodash";
import { Pressable } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function NotificationsList({ notifications, item, navigation }) {
  const [image, setImage] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const [imageType, setImageType] = useState();

  const getPost = async () => {
    const userId = supabase.auth.currentUser.id;

    const post = await supabase.from("post").select("*").eq("id", item.postId);

    return post;
  };

  useEffect(() => {
    const getPhoto = async () => {
      const resp = await getPost();
      const photo = resp.body;

      photo.map((pic) => setImage(pic.media));
      photo.map((pic) => setImageType(pic.mediaType));
    };
    getPhoto();
  }, []);

  return (
    <View style={{ paddingBottom: 40 }}>
      <Pressable>
        <Image
          style={{ height: 40, width: 40, borderRadius: 100 }}
          source={
            item.userProfileImage === null
              ? require("../../assets/noProfilePic.jpeg")
              : { uri: item.userProfileImage }
          }
        />
      </Pressable>
      <View style={{ bottom: 40 }}>
        <Pressable>
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

          {/* <Image
            style={{
              height: 60,
              width: 60,
              borderRadius: 10,
              position: "absolute",
              marginBottom: 10,
              left: 300,
            }}
            source={{ uri: image }}
          /> */}

          {imageType === "image" ? (
            <Image
              style={{
                height: 60,
                width: 60,
                left: 300,
                marginBottom: 10,
                position: "absolute",
              }}
              source={
                item.bannerImage === null
                  ? require("../../assets/noProfilePic.jpeg")
                  : { uri: image }
              }
            />
          ) : (
            <Video
              source={{ uri: image }}
              isMuted={true}
              resizeMode="cover"
              style={{
                height: 60,
                width: 60,
                left: 300,
                marginBottom: 10,
                position: "absolute",
              }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
