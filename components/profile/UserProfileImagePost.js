import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";
import { useUser } from "../../context/UserContext";
import CurrentUserButtons from "../home/CurrentUserButtons";

export default function UserProfileImagePost({
  post,
  navigation,
  user,
  setUser,
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);


  const createThreeButtonAlert = () =>
    Alert.alert("Post Options", "My Alert Msg", [
      {
        text: "Edit Post",
        onPress: () =>
          navigation.navigate("EditPost", {
            user_id: post.user_id,
            description: post.description,
            title: post.title,
            id: post.id,
          }),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete Post", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <View style={{ paddingBottom: 90, bottom: 10 }}>
      <Pressable>
        <Image
          source={{ uri: post.media }}
          style={{
            height: 398,
            aspectRatio: 1,
            alignSelf: "center",
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
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
        {/* {post.user_id === user.user_id ? (
          <TouchableOpacity onPress={() => createThreeButtonAlert()}>
            <Image
              style={{
                resizeMode: "contain",
                position: "absolute",
                height: 28,
                left: 340,
              }}
              source={require("../../assets/moreCircle.png")}
            />
          </TouchableOpacity>
        ) : null} */}
      </View>

      {/* <UserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        navigation={navigation}
        item={post}
      />  */}

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
