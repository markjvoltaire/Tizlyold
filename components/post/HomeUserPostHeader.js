import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";

export default function HomeUserPostHeader() {
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const { user, setUser } = useUser();
  const [userInfo, setUserinfo] = useState();
  const [loading, setLoading] = useState(true);

  const width = Dimensions.get("window").width;

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

  async function getAvi() {
    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", item.user_id);

    return resp.body;
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const resp = await getAvi();
      setUserinfo(resp);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getUserInfo();
  }, []);

  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: 390,
        alignSelf: "center",
      }}
    />
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const seeLikes = async () => {
        const res = await getLikes();
        res.map((post) => setIsPressed(post.liked));

        if (res.length === 0) {
          setIsPressed(false);
        }
      };
      seeLikes();
    });
    return unsubscribe;
  }, [navigation]);

  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  let height = Dimensions.get("window").height;

  return (
    <View
      style={{ alignSelf: "center", top: height * 0.04, right: width * 0.05 }}
    >
      <TouchableOpacity
        onPress={() => navigation.push("ProfileDetail2", { item })}
      >
        <Image
          style={{
            height: 35,
            width: 35,
            borderRadius: 100,
            bottom: 30,
          }}
          source={{ uri: item.profileimage }}
        />

        <View style={{ bottom: 63, left: 40 }}>
          <Text style={{ fontWeight: "800" }}>{item.displayName}</Text>
          <Text
            style={{
              fontWeight: "600",
              color: "#A1A1B3",
            }}
          >
            @{item.username}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
