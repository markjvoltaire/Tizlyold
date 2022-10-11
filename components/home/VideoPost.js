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
import PostHeader from "./PostHeader";

export default function VideoPost({ item, navigation, route }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const { user, setUser } = useUser();

  return (
    <View style={{ paddingBottom: 55, top: 10 }}>
      <View style={{ alignSelf: "center", right: 20, top: 40 }}>
        <PostHeader navigation={navigation} item={item} />
      </View>
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
            height: 398,
            aspectRatio: 1,
            alignSelf: "center",
            borderRadius: 10,
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
            top: 219,
            borderRadius: 12,
            position: "absolute",
          }}
          source={require("../../assets/fader.png")}
        />

        <Image
          style={{
            position: "absolute",
            width: 50,
            top: 160,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("../../assets/playButton.png")}
        />
      </Pressable>

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
