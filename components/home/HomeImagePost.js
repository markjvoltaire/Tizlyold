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
import CurrentUserButtons from "./CurrentUserButtons";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import PostSkeleton from "../profile/PostSkeleton";
import ProfilePostHeader from "../post/ProfilePostHeader";
import UserButtons from "./UserButtons";
import HomePostHeader from "../post/HomePostHeader";

export default function HomeImagePost({ navigation, item }) {
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const { user, setUser } = useUser();
  const [userInfo, setUserinfo] = useState();
  const [loading, setLoading] = useState(true);

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
    <>
      <View
        style={{ paddingBottom: 4, top: height * 0.06, alignSelf: "center" }}
      >
        <View
          style={{
            alignSelf: "center",
            bottom: 50,
            paddingBottom: 3,
          }}
        >
          <HomePostHeader navigation={navigation} item={item} />
        </View>

        <Pressable onPress={() => navigation.push("ImageDetails", { item })}>
          {/* <SharedElement id={item.id}> */}
          <View style={{ bottom: 50, alignSelf: "center" }}>
            <PostSkeleton />
          </View>
          {/* </SharedElement> */}
          {/* <SharedElement id={item.id}> */}
          <Animated.Image
            style={{
              height: height * 0.454,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
              bottom: 50,
              borderColor: "#5C5C5C",
              borderWidth: 0.2,
              opacity: imageAnimated,
            }}
            source={{ uri: item.media }}
            onLoad={handleImageLoad}
            resizeMode="cover"
          />
          {/* </SharedElement> */}
        </Pressable>

        <View style={{ bottom: 50 }}>
          <Text
            style={{
              left: 13,
              top: 12,
              fontWeight: "700",
              textAlign: "left",
              width: 390,
              paddingBottom: 30,
              lineHeight: 20,
            }}
          >
            {item.description}
          </Text>

          <Image
            resizeMode="contain"
            style={{ width: 70, left: 10, bottom: 30 }}
            source={require("../../assets/photoBean.png")}
          />
        </View>

        <View style={{ bottom: 90 }}>
          {item.user_id === user.user_id ? (
            <CurrentUserButtons
              isPressed={isPressed}
              setIsPressed={setIsPressed}
              saveIsPressed={saveIsPressed}
              setSaveIsPressed={setSaveIsPressed}
              navigation={navigation}
              item={item}
            />
          ) : (
            <>
              <UserButtons
                isPressed={isPressed}
                setIsPressed={setIsPressed}
                saveIsPressed={saveIsPressed}
                setSaveIsPressed={setSaveIsPressed}
                item={item}
                navigation={navigation}
              />
            </>
          )}
        </View>
      </View>
      <FullSeperator />
    </>
  );
}

const styles = StyleSheet.create({});