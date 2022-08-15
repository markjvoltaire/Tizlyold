import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import UserButtons from "./UserButtons";
import { Video, AVPlaybackStatus } from "expo-av";
import { StackActions } from "@react-navigation/native";
import { getPosts } from "../../services/user";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";

export default function HomeFeedList({ item, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { user, setUser } = useUser();
  const pushAction = StackActions.replace("HomeScreen");
  const [isPressed, setIsPressed] = useState(false);
  const [like, setLike] = useState();

  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const userId = supabase.auth.currentUser.id;

  if (item.mediaType === "image") {
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

          return res.body;
        }
        getAllLikes();
        console.log("isPressed from Home Feed List", isPressed);
      });
      return unsubscribe;
    }, [navigation]);

    return (
      <View style={{ paddingBottom: 40 }}>
        <View style={{ alignSelf: "center", paddingBottom: 25, left: 25 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileDetail", {
                user_id: item.user_id,
                bannerImage: item.bannerImage,
                username: item.username,
                displayName: item.displayName,
                profileimage: item.profileimage,
                bio: item.bio,
                likeId: item.likeId,
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
        <Image
          style={{
            height: 398,
            aspectRatio: 1,
            alignSelf: "center",
            borderRadius: 10,
          }}
          source={{ uri: item.media }}
        />
        <View style={{ top: 10 }}>
          <Text
            style={{
              left: 7,
              fontWeight: "700",
              fontSize: 18,
              textAlign: "left",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              left: 7,
              top: 10,
              fontWeight: "500",
              color: "#4F4E4E",
              textAlign: "left",
              width: 400,
            }}
          >
            {item.description}
          </Text>
          <Image
            style={{
              top: 13,
              left: 4,
              height: 54,
              width: 64,
              resizeMode: "contain",
            }}
            source={require("../../assets/bluePhotoButton.png")}
          />
        </View>
        <View>
          <UserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            item={item}
          />
          <FullSeperator />
        </View>
      </View>
    );
  }

  if (item.mediaType === "video") {
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

          return res.body;
        }
        getAllLikes();
        console.log("isPressed from Home Feed List", isPressed);
      });
      return unsubscribe;
    }, [navigation]);

    if (status.positionMillis === status.durationMillis) {
    }

    return (
      <View style={{ paddingBottom: 40 }}>
        <View></View>
        <View
          style={{
            alignSelf: "center",
            paddingBottom: 25,
            left: 25,
            bottom: 10,
          }}
        >
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

        <View>
          <Video
            source={{ uri: item.media }}
            ref={video}
            useNativeControls
            style={{
              height: 220,
              width: 388,
              borderRadius: 12,
              alignSelf: "center",
            }}
            resizeMode="contain"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>

        <View>
          <View style={{ top: 10 }}>
            <Text
              style={{
                left: 7,
                fontWeight: "700",
                fontSize: 18,
                textAlign: "left",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                left: 7,
                top: 10,
                fontWeight: "500",
                color: "#4F4E4E",
                textAlign: "left",
                width: 400,
                lineHeight: 27,
              }}
            >
              {item.description}
            </Text>
            <Image
              style={{
                top: 20,
                left: 4,
                height: 54,
                width: 64,
                resizeMode: "contain",
              }}
              source={require("../../assets/blueVideoButton.png")}
            />
          </View>
        </View>
        <View style={{ top: 20, paddingBottom: 20 }}>
          <UserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            item={item}
          />
        </View>
        <FullSeperator />
      </View>
    );
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

          return res.body;
        }
        getAllLikes();
        console.log("isPressed from Home Feed List", isPressed);
      });
      return unsubscribe;
    }, [navigation]);

    return (
      <View style={{ paddingBottom: 40 }}>
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
        <UserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          item={item}
        />
        <FullSeperator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    left: 1,
    top: 40,
    height: 3,
  },
});
