import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import UserButtons from "../home/UserButtons";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import CurrentUserButtons from "../home/CurrentUserButtons";
import { useUser } from "../../context/UserContext";
import { useLike } from "../../context/LikeContext";
import VideoHeader from "../post/VideoHeader";
import ProfileHeader from "./ProfileHeader";
import PostActivity from "../../views/PostActivity";
import HomePostButtons from "../home/HomePostButtons";
import Buttons from "../home/Buttons";
import { supabase } from "../../services/supabase";
import PostSkeleton from "./PostSkeleton";

export default function ProfileImagePost({ item, navigation, followingId }) {
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
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

  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

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

  return (
    <>
      <View style={{ paddingBottom: 45, top: 60 }}>
        <View style={{ alignSelf: "center", right: 20, bottom: 10 }}>
          <ProfileHeader navigation={navigation} item={item} />
        </View>

        <Pressable onPress={() => navigation.push("ImageDetails", { item })}>
          <View style={{ bottom: 50, alignSelf: "center" }}>
            <PostSkeleton />
          </View>

          <SharedElement id={item.id}>
            <Animated.Image
              style={{
                height: 398,
                aspectRatio: 1,
                alignSelf: "center",
                borderRadius: 10,
                bottom: 50,
                borderColor: "#5C5C5C",
                borderWidth: 0.2,
                opacity: imageAnimated,
              }}
              source={{ uri: item.media }}
              resizeMode="cover"
              onLoad={handleImageLoad}
            />
          </SharedElement>
        </Pressable>
        {/* 
        <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 200,
            width: 398,
            top: 217,
            borderRadius: 12,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../assets/fader.png")}
        /> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileDetail2", {
              user_id: item.user_id,
            });
          }}
          style={{ position: "absolute" }}
        ></TouchableOpacity>

        <View style={{ bottom: 50 }}>
          <Text
            style={{
              left: 13,
              top: 12,
              fontWeight: "700",
              textAlign: "left",
              width: 390,
              paddingBottom: 6,
              lineHeight: 20,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              left: 13,
              top: 12,
              fontWeight: "600",
              color: "#4F4E4E",
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

              {/* <HomePostButtons item={item} /> */}

              {/* <Buttons navigation={navigation} item={item} /> */}
            </>
          )}
        </View>
      </View>
      <FullSeperator />
    </>
  );
}

{
  /* <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              position: "absolute",
              left: 20,
              top: 330,
            }}
            source={{ uri: item.profileimage }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              top: 342,
              left: 60,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            {item.username}
          </Text> */
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.3,
    width: 390,
    alignSelf: "center",
  },
});
