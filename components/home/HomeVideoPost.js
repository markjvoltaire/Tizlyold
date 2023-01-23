import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Video } from "expo-av";
import VideoPlayer from "react-native-video-controls";
import UserButtons from "../home/UserButtons";
import { useUser } from "../../context/UserContext";
import PostHeader from "../home/PostHeader";
import ProfilePostHeader from "../post/ProfilePostHeader";
import * as VideoThumbnails from "expo-video-thumbnails";

export default function HomeVideoPost({ navigation, item }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: 390,
        alignSelf: "center",
        bottom: height * 0.03,
      }}
    />
  );

  return (
    <>
      <View
        key={item.id}
        style={{
          alignSelf: "center",
          paddingBottom: height * 0.04,
          top: height * 0.06,
        }}
      >
        <Pressable
          onPress={async () => {
            setModalVisible(true);
          }}
        >
          <Video
            resizeMode="cover"
            ref={video}
            shouldPlay={false}
            style={{
              height: height * 0.45,
              width: width * 0.995,
              borderRadius: 10,
            }}
            posterSource={{ uri: item.profileimage }}
            source={{ uri: item.media }}
          />
          <Image
            style={{
              height: height * 0.45,
              width: width * 0.995,
              borderRadius: 18,
              position: "absolute",
            }}
            source={require("../../assets/fader.png")}
          />
        </Pressable>

        <Pressable onPress={() => navigation.push("ProfileDetail2", { item })}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: 10,
              paddingBottom: 15,
              position: "absolute",
              bottom: height * 0.44,
            }}
          >
            <Image
              source={{ uri: item.profileimage }}
              style={styles.profileImage}
            />
            <View style={styles.userTextContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                {item.displayName}
              </Text>
              <Text style={styles.username}>@{item.username}</Text>
            </View>
          </View>
        </Pressable>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 22,
            paddingBottom: 10,
            left: 10,
            top: 5,
          }}
        >
          {item.description}
        </Text>
        <View style={{ bottom: height * 0.01, paddingBottom: height * 0.05 }}>
          <UserButtons item={item} navigation={navigation} />
        </View>
      </View>

      <Modal animationType="slide" visible={modalVisible}>
        <View style={{ backgroundColor: "black", flex: 1, opacity: 1 }}>
          <VideoPlayer
            onEnd={() => setModalVisible(false)}
            onBack={() => setModalVisible(false)}
            seekColor={"#00A3FF"}
            disableVolume
            disableFullscreen
            controls={true}
            style={{
              width: width,
              height: height,
            }}
            source={{ uri: item.media }}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.3,
    width: 390,
    alignSelf: "center",
  },

  videoContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },

  tweetContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 52,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 15,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  userTextContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
  },
  username: {
    color: "#A1A1B3",
    fontSize: 12,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  tweet: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 22,
  },
});
