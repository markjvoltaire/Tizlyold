import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";
import { useUser } from "../../context/UserContext";
import CurrentUserButtons from "../home/CurrentUserButtons";

import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import PostHeader from "../home/PostHeader";
import ProfileHeader from "./ProfileHeader";

export default function UserProfileImagePost({
  post,
  navigation,
  user,
  setUser,
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

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
    <View style={{ paddingBottom: 90 }}>
      <View style={{ alignSelf: "center", top: 32 }}>
        <ProfileHeader navigation={navigation} item={post} />
      </View>

      <Pressable
        key={post.id}
        onPress={() =>
          navigation.push("ImageDetails", {
            item: post,
          })
        }
      >
        <SharedElement id={post.id}>
          <Animated.Image
            source={require("../../assets/defaultImage.png")}
            style={{
              height: 398,
              position: "absolute",
              opacity: defaultImageAnimated,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "#5C5C5C",
              borderWidth: 0.2,
            }}
            resizeMode="cover"
            onLoad={handleDefaultImageLoad}
          />
        </SharedElement>

        <SharedElement id={post.id}>
          <Animated.Image
            source={{ uri: post.media }}
            style={{
              height: 398,
              opacity: imageAnimated,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "#5C5C5C",
              borderWidth: 0.2,
            }}
            resizeMode="cover"
            onLoad={handleImageLoad}
          />
        </SharedElement>
      </Pressable>

      <View style={{ top: 7, right: 10 }}>
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
          {post.title}
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
          {post.description}
        </Text>

        <Image
          resizeMode="contain"
          style={{ width: 70, left: 10, bottom: 30 }}
          source={require("../../assets/photoBean.png")}
        />
      </View>

      <CurrentUserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        navigation={navigation}
        item={post}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 428,
  },
});
