import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import UserButtons from "../home/UserButtons";
import { Video, AVPlaybackStatus } from "expo-av";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import ProfileUserButtons from "./ProfileUserButtons";
import ImagePost from "../home/ImagePost";
import ProfileImagePost from "./ProfileImagePost";
import ProfileVideoPost from "./ProfileVideoPost";

export default function ProfileFeedList({ item, route, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const { user } = useUser();
  const userId = user.user_id;
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  if (item.mediaType === "image") {
    return <ProfileImagePost navigation={navigation} item={item} />;
  }

  if (item.mediaType === "video") {
    return <ProfileVideoPost navigation={navigation} item={item} />;
  }

  if (item.mediaType === "text") {
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        async function getAllLikes() {
          const res = await supabase
            .from("likes")
            .select("*")
            .eq("userId", userId)
            .eq("postId", item.id)
            .eq("liked_Id", item.likeId);

          res.body.map((like) => setIsPressed(like.liked));

          if (isPressed === undefined || false) {
            setIsPressed(false);
          }

          return res.body;
        }
        getAllLikes();
      });
      return unsubscribe;
    }, [navigation]);
    return (
      <View style={{ paddingBottom: 130 }}>
        <View style={{ alignSelf: "center", paddingBottom: 45, left: 25 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileDetail", {
                user_id: item.user_id,
                bannerImage: item.bannerImage,
                username: item.username,
                displayName: item.displayName,
                profileimage: item.profileimage,
                bio: item.bio,
              })
            }
          >
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                right: 55,
                top: 37,
              }}
              source={{ uri: item.profileimage }}
            />
            <Text style={{ right: 6, fontWeight: "600", fontSize: 16 }}>
              {item.displayName}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color: "#73738B",
                right: 5,
              }}
            >
              @{item.username}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center", width: 400 }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 16,
              lineHeight: 27,
              fontWeight: "600",
              paddingBottom: 40,
              alignSelf: "center",
            }}
          >
            {item.description}
          </Text>
        </View>
        <View>
          <ProfileUserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            saveIsPressed={saveIsPressed}
            setSaveIsPressed={setSaveIsPressed}
            item={item}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullSeperator: {
    position: "absolute",
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    height: 3,
    top: 305,
  },
});
