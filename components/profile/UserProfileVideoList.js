import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../home/UserButtons";
import CurrentUserButtons from "../home/CurrentUserButtons";

export default function UserProfileVideoPost({ post, user, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  return (
    <View style={{ paddingBottom: 90, bottom: 10 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Player", {
            id: post.id,
            username: post.username,
            profileimage: post.profileimage,
            displayName: post.displayName,
            user_id: post.user_id,
          })
        }
      >
        <Video
          source={{ uri: post.media }}
          ref={video}
          style={{
            height: 400,
            aspectRatio: 1,
            borderRadius: 12,
            alignSelf: "center",
            top: 20,
          }}
          resizeMode="cover"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 180,
            width: 400,
            top: 240,
            borderRadius: 12,
            position: "absolute",
          }}
          source={require("../../assets/fader.png")}
        />
        <Image
          style={{
            position: "absolute",
            width: 60,
            top: 190,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("../../assets/playButton.png")}
        />
      </Pressable>

      <View style={{ position: "absolute", top: 390, left: 5 }}>
        <Text style={{ color: "white", fontWeight: "700" }}>{post.title}</Text>
      </View>

      <View style={{ position: "absolute" }}>
        <Image
          style={{
            height: 35,
            width: 35,
            borderRadius: 100,
            position: "absolute",
            left: 5,
            top: 350,
          }}
          source={{ uri: user.profileimage }}
        />
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 360,
            left: 50,
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          {post.username}
        </Text>
      </View>

      <View>
        <Text
          style={{
            left: 5,
            top: 32,
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
      {/* <UserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        item={post}
      /> */}

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
