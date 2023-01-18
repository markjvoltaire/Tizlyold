import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ProfilePostHeader from "../post/ProfilePostHeader";
import StatusText from "../post/StatusText";
import UserButtons from "../home/UserButtons";
import { Video } from "expo-av";

export default function ProfileFeedList({ freePosts, profile, navigation }) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <View style={{ bottom: height * 0.11, marginBottom: height * 0.6 }}>
      {freePosts.map((item) => {
        if (item.mediaType === "status") {
          return (
            <>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 10,
                  paddingBottom: 68,
                }}
              >
                <View style={styles.userContainer}>
                  <Image
                    source={{ uri: item.profileimage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.userTextContainer}>
                    <Text style={styles.name}>{item.displayName}</Text>
                    <Text style={styles.username}>@{item.username}</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.tweet}>{item.description}</Text>
                </View>
              </View>

              <View style={{ bottom: height * 0.072 }}>
                <UserButtons navigation={navigation} item={item} />
                <FullSeperator />
              </View>
            </>
          );
        }

        if (item.mediaType === "image") {
          return (
            <>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 10,
                  paddingBottom: 68,
                  bottom: height * 0.02,
                }}
              >
                <View style={styles.textContainer}>
                  <Image
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
                </View>

                <View
                  style={{
                    position: "absolute",
                    top: height * 0.4,
                    right: width * 0.67,
                  }}
                >
                  <View style={styles.userContainer}>
                    <Image
                      source={{ uri: item.profileimage }}
                      style={styles.profileImage}
                    />
                    <View style={styles.userTextContainer}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "white",
                          fontFamily: "Helvetica-Bold",
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
                      fontSize: 17,
                      lineHeight: 22,
                      bottom: height * 0.002,

                      right: width * 0.02,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              <View style={{ bottom: height * 0.072 }}>
                <UserButtons navigation={navigation} item={item} />
                <FullSeperator />
              </View>
            </>
          );
        }

        if (item.mediaType === "video") {
          return (
            <>
              <View style={{ alignSelf: "center", bottom: height * 0.01 }}>
                <TouchableOpacity
                  onPress={async () => {
                    await video?.current?.playAsync();
                    video?.current?.presentFullscreenPlayer();
                  }}
                >
                  <Video
                    ref={video}
                    resizeMode="cover"
                    isLooping
                    isMuted
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
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    paddingBottom: 15,
                    position: "absolute",
                    top: height * 0.38,
                    left: width * 0.032,
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
                        fontSize: 16,
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
                    fontSize: 17,
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
                <UserButtons navigation={navigation} item={item} />
                <FullSeperator />
              </View>
            </>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  userTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    color: "#A1A1B3",
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
