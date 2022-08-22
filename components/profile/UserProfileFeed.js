import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";
import ProfileUserButtons from "./ProfileUserButtons";
import { useUser } from "../../context/UserContext";

export default function UserProfileFeed({
  item,
  navigation,
  route,
  post,
  setPosts,
}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const { user, setUser } = useUser();
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const userId = user.id;

  if (item.mediaType === "image") {
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        async function getCurrentUserPosts() {
          let { data: post, error } = await supabase
            .from("post")
            .select("*")
            .eq("user_id", user.user_id)
            .order("id", { ascending: false });

          return post;
        }

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
        getCurrentUserPosts();
      });
      return unsubscribe;
    }, [navigation]);

    return (
      <View style={{ paddingBottom: 85 }}>
        <View style={{ alignSelf: "center", paddingBottom: 25, left: 25 }}>
          <TouchableOpacity>
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
          <ProfileUserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            saveIsPressed={saveIsPressed}
            setSaveIsPressed={setSaveIsPressed}
            route={route}
            item={item}
          />
        </View>
        <FullSeperator />
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

          if (isPressed === undefined || false) {
            setIsPressed(false);
          }

          return res.body;
        }
        getAllLikes();
      });
      return unsubscribe;
    }, [navigation]);

    if (status.positionMillis === status.durationMillis) {
    }

    return (
      <View style={{ paddingBottom: 85 }}>
        <View></View>
        <View
          style={{
            alignSelf: "center",
            paddingBottom: 25,
            left: 25,
            bottom: 10,
          }}
        >
          <TouchableOpacity>
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
          <TouchableOpacity>
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
        <ProfileUserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
          item={item}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedContainer: {
    alignItems: "center",
    top: 20,
  },

  fullSeperator: {
    position: "absolute",
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.4,
    width: 900,
  },
});
