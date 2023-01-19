import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Video } from "expo-av";
import UserButtons from "../home/UserButtons";
import { useUser } from "../../context/UserContext";
import PostHeader from "../home/PostHeader";
import ProfilePostHeader from "../post/ProfilePostHeader";

export default function ProfileVideoPost({
  item,
  navigation,
  userInfo,
  profile,
  isFollowing,
}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const utc = new Date(item.date);

  const date = utc.toDateString();

  async function createComment() {
    const resp = await supabase.from("comments").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        comment: comment,
        userProfileImage: user.profileimage,
        postId: item.id,
        userDisplayName: user.displayName,
        userUsername: user.username,
      },
    ]);

    return resp;
  }
  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: width,
        alignSelf: "center",
        position: "absolute",
        top: height * 0.11,
      }}
    />
  );

  const FullSeperator2 = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.3,
        width: width,
        alignSelf: "center",
        position: "absolute",
        top: height * 0.575,
      }}
    />
  );

  const { user, setUser } = useUser();

  return (
    <>
      <View
        key={item.id}
        style={{
          alignSelf: "center",
          bottom: height * 0.12,
        }}
      >
        <Pressable onPress={() => setModalVisible(true)}>
          <Video
            resizeMode="cover"
            ref={video}
            style={{
              height: height * 0.45,
              width: width * 0.995,
              borderRadius: 18,
            }}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            paddingBottom: 15,
            position: "absolute",
            top: height * 0.4,
            left: width * 0.032,
          }}
        >
          <Image
            source={{ uri: profile.profileimage }}
            style={styles.profileImage}
          />
          <View style={styles.userTextContainer}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: "white",
              }}
            >
              {item.displayName}
            </Text>
            <Text style={styles.username}>@{item.username}</Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 14,
            lineHeight: 22,
            paddingBottom: 10,
            left: 10,
            top: 5,
          }}
        >
          {item.description}
        </Text>
      </View>
      <View style={{ bottom: height * 0.012, paddingBottom: 30 }}>
        {/* <FullSeperator /> */}
        <Modal animationType="slide" visible={modalVisible}>
          <View>
            <Image
              style={styles.logo}
              source={require("../../assets/tizlyicon.jpg")}
            />
            <FullSeperator />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={styles.backButton}
                source={require("../../assets/backButton.png")}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                paddingBottom: 15,
                position: "absolute",
                top: height * 0.12,
                left: width * 0.032,
                alignSelf: "center",
              }}
            >
              <Image
                source={{ uri: profile.profileimage }}
                style={styles.profileImage}
              />
              <View style={styles.userTextContainer}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    color: "black",
                  }}
                >
                  {item.displayName}
                </Text>
                <Text style={styles.username}>@{item.username}</Text>
              </View>
            </View>
            <View
              style={{
                top: height * 0.15,
                height: height * 0.26,
                width: width,
                backgroundColor: "black",
              }}
            >
              <LottieView
                style={{
                  height: height * 0.4,
                  width: width * 0.4,
                  position: "absolute",
                  alignSelf: "center",
                  bottom: height * -0.02,
                }}
                source={require("../../assets/lottie/fullBlueCircle.json")}
                autoPlay
              />
              <Video
                ref={video}
                source={{ uri: item.media }}
                isLooping
                useNativeControls
                shouldPlay={true}
                style={{
                  height: height * 0.26,
                  width: width,
                  position: "absolute",
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
            <Text
              style={{
                top: height * 0.16,
                fontWeight: "600",
                left: width * 0.03,
              }}
            >
              {item.description}
            </Text>
            <Text
              style={{
                top: height * 0.17,
                color: "#73738B",
                fontWeight: "500",
                left: width * 0.03,
              }}
            >
              {date}
            </Text>
            <View style={{ top: height * 0.17 }}>
              <UserButtons navigation={navigation} item={item} />
            </View>
            <FullSeperator2 />
            <Text
              style={{
                top: height * 0.24,
                alignSelf: "center",
                color: "#73738B",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Comments
            </Text>
          </View>
        </Modal>
      </View>
    </>
  );
}
{
  /* <View style={{ backgroundColor: "white", flex: 1, opacity: 1 }}>
  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
    <Text style={{ top: 100, color: "white" }}>Close</Text>
  </TouchableOpacity>
  <Video
    ref={video}
    shouldPlay
    useNativeControls
    isLooping
    resizeMode="cover"
    style={{
      height: height * 0.26,
      width: width,
      alignSelf: "center",
      top: height * 0.25,
    }}
    source={{ uri: item.media }}
  />
</View> */
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.3,
    width: 390,
    alignSelf: "center",
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
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 15,
  },
  profileImage: {
    width: 35,
    height: 35,
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

  logo: {
    position: "absolute",
    alignSelf: "center",
    top: 60,
    resizeMode: "contain",
    width: 52,
    height: 26,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 1.8,
    opacity: 0.8,
    width: 900,
    left: 1,
    height: 3,
    top: 100,
  },
  backButton: {
    height: 20,
    width: 20,
    top: 60,
    left: 20,
  },
});
