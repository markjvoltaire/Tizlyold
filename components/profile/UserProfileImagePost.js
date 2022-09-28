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

export default function UserProfileImagePost({
  post,
  navigation,
  user,
  setUser,
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

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
        <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 200,
            width: 398,
            top: 200,
            borderRadius: 12,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../assets/fader.png")}
        />
      </Pressable>
      <View style={{ position: "absolute", top: 370, left: 10 }}>
        <Text style={{ color: "white", fontWeight: "700" }}>{post.title}</Text>
      </View>

      <View style={{ position: "absolute" }}>
        <Image
          style={{
            height: 35,
            width: 35,
            borderRadius: 100,
            position: "absolute",
            left: 10,
            top: 330,
          }}
          source={{ uri: user.profileimage }}
        />
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 342,
            left: 50,
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          {user.username}
        </Text>
      </View>

      <View>
        <Text
          style={{
            left: 5,
            top: 12,
            fontWeight: "700",
            color: "#4F4E4E",
            textAlign: "left",
            width: 390,
            paddingBottom: 30,
          }}
        >
          {post.description}
        </Text>
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

const styles = StyleSheet.create({});
