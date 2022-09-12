import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import UserButtons from "./UserButtons";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import CurrentUserButtons from "./CurrentUserButtons";
import { useUser } from "../../context/UserContext";
import VideoHeader from "../post/VideoHeader";

export default function ImagePost({ item, navigation, followingId }) {
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const { user, setUser } = useUser();

  // const month = item.posted.slice(5);
  // const date = month.concat("-");
  // const year = item.posted.slice(0, 4);

  // const postDate = date + year;
  // const milliseconds = status.durationMillis;
  // const seconds = milliseconds / 1000;

  return (
    <View style={{ paddingBottom: 55 }}>
      <Pressable
        onPress={() =>
          navigation.push("ImageDetails", {
            item,
            isPressed,

            saveIsPressed,
          })
        }
      >
        <SharedElement id={item.id}>
          <Image
            style={{
              height: 398,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
            }}
            source={{ uri: item.media }}
            resizeMode="contain"
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

      <View style={{ position: "absolute", top: 370, left: 20 }}>
        <Text style={{ color: "white", fontWeight: "700" }}>{item.title}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfileDetail2", {
            user_id: item.user_id,
          });
        }}
        style={{ position: "absolute" }}
      >
        <View style={{ position: "absolute" }}>
          <Image
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
          </Text>
        </View>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            left: 15,
            top: 12,
            fontWeight: "700",
            color: "#4F4E4E",
            textAlign: "left",
            width: 390,
            paddingBottom: 30,
          }}
        >
          {item.description}
        </Text>

        {/* <Text style={{ left: 17, fontWeight: "700", color: "#4F4E4E" }}>
          {postDate}
        </Text> */}
      </View>

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
        <UserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
          item={item}
          navigation={navigation}
        />
      )}
      <FullSeperator />
    </View>
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    top: 35,
  },
});
