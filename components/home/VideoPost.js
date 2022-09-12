import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import React, { useState } from "react";
import UserButtons from "./UserButtons";
import TrendingCreators from "../explore/TrendingCreators";
import CurrentUserButtons from "./CurrentUserButtons";
import { useUser } from "../../context/UserContext";

export default function VideoPost({ item, navigation, route }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const { user, setUser } = useUser();

  return (
    <View style={{ paddingBottom: 55 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Player", {
            id: item.id,
            username: item.username,
            profileimage: item.profileimage,
            displayName: item.displayName,
            user_id: item.user_id,
            item,
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

      <View style={{ position: "absolute", top: 230, left: 20 }}>
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
              top: 190,
            }}
            source={{ uri: item.profileimage }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              top: 200,
              left: 60,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            {item.username}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ paddingBottom: 30 }}>
        <Text
          style={{
            left: 15,
            top: 12,
            fontWeight: "700",
            color: "#4F4E4E",
            textAlign: "left",
            width: 390,
            paddingBottom: 30,
            lineHeight: 20,
          }}
        >
          {item.description}
        </Text>

        <View>
          <Text style={{ left: 17, fontWeight: "500", top: 15 }}>Video</Text>
        </View>
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
    top: 40,
  },
});
