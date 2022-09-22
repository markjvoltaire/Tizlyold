import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../home/UserButtons";

export default function ProfileVideoPost({ item, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const milliseconds = status.durationMillis;

  return (
    <View style={{ paddingBottom: 90, top: 10.5 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Player", {
            id: item.id,
            username: item.username,
            profileimage: item.profileimage,
            displayName: item.displayName,
            user_id: item.user_id,
          })
        }
      >
        <Video
          source={{ uri: item.media }}
          ref={video}
          style={{
            height: 260,
            width: 400,
            borderRadius: 12,
            alignSelf: "center",
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
            top: 80,
            borderRadius: 12,
            position: "absolute",
          }}
          source={require("../../assets/fader.png")}
        />
        <Image
          style={{
            position: "absolute",
            width: 50,
            top: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("../../assets/playButton.png")}
        />
      </Pressable>

      <View style={{ position: "absolute", top: 230, left: 5 }}>
        <Text style={{ color: "white", fontWeight: "700" }}>{item.title}</Text>
      </View>

      <View style={{ position: "absolute" }}>
        <Image
          style={{
            height: 35,
            width: 35,
            borderRadius: 100,
            position: "absolute",
            left: 5,
            top: 190,
          }}
          source={{ uri: item.profileimage }}
        />
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 200,
            left: 50,
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          {item.username}
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
          {item.description}
        </Text>
      </View>

      <UserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        item={item}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
