import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";

export default function NoProfilePost({ navigation, profile }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <>
      <View>
        {/* <Image
          style={styles.userBanner}
          source={{ uri: profile.bannerImage }}
        />
        <Video
          source={{ uri: profile.bannerImage }}
          isLooping
          shouldPlay={true}
          isMuted={true}
          resizeMode="cover"
          style={styles.userBanner}
        /> */}

        {profile.bannerImageType === "image" ? (
          <Image
            style={styles.userBanner}
            source={
              profile.bannerImage === null
                ? require("../../assets/noProfilePic.jpeg")
                : { uri: profile.bannerImage }
            }
          />
        ) : (
          <Video
            source={
              profile.bannerImage === null
                ? require("../../assets/noProfilePic.jpeg")
                : { uri: profile.bannerImage }
            }
            isLooping
            shouldPlay={true}
            isMuted={true}
            resizeMode="cover"
            style={styles.userBanner}
          />
        )}
        <Image
          style={styles.userBannerFader}
          source={require("../../assets/fader.png")}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backButton}
            source={require("../../assets/backButton2.png")}
          />
        </TouchableOpacity>
        <View style={{ bottom: 410 }}>
          <Text style={styles.displayname}>{profile.displayName}</Text>
          <Text style={styles.username}>@{profile.username}</Text>
          <Text style={styles.bio}> {profile.bio}</Text>
          <Image
            style={styles.profileImage}
            source={
              profile.profileimage === null
                ? require("../../assets/noProfilePic.jpeg")
                : { uri: profile.profileimage }
            }
          />
          <TouchableOpacity onPress={() => handleFollow()}>
            <Image
              style={styles.subButton}
              source={
                isFollowing === true
                  ? require("../../assets/followingbutton.png")
                  : require("../../assets/followbutton.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileNav}>
          <Text style={styles.home}>Home</Text>

          <FullSeperator />
        </View>
        <View style={{ alignItems: "center", top: 130, flex: 1 }}>
          <Text
            style={{
              bottom: 60,
              fontWeight: "600",
              fontSize: 20,
              color: "#686877",
            }}
          >
            @{profile.username} Has No Content Yet.
          </Text>
          <Image
            style={{ height: 170, resizeMode: "contain", bottom: 20 }}
            source={require("../../assets/mobile-application.png")}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
    alignSelf: "center",
    top: 60,
  },

  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 428,
  },

  profileNav: {
    position: "absolute",
    top: 85,
    width: 4000,
  },
  home: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 180,
    fontSize: 16,
  },

  title: {
    left: 35,
    fontWeight: "800",
    fontSize: 15,
    paddingBottom: 15,
    top: 8,
  },
  description: {
    left: 35,
    fontWeight: "600",
    color: "#5F5F69",
  },

  media: {
    height: 392,
    width: 343,
    borderRadius: 12,
    alignSelf: "center",
  },

  postUsername: {
    bottom: 26,
    fontWeight: "500",
    color: "#5F5F69",
    fontSize: 12,
  },

  postDisplayname: {
    fontWeight: "600",
    fontSize: 16,
    bottom: 27,
  },

  feedContainer: {
    alignItems: "center",
    top: 20,
    flex: 1,
  },
  displayNameContainer: {
    left: 40,
    bottom: 33,
  },
  usernameContainer: {
    left: 40,
    bottom: 33,
  },
  halfSep: {
    top: 655,
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.6,
    width: 300,
    left: 60,
  },
  subButton: {
    resizeMode: "contain",
    top: 360,
    width: 160,
    height: 30,
    right: 30,
  },

  displayname: {
    position: "absolute",
    height: 38,
    left: 75,
    right: 64.27,
    top: 253,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    width: 400,
  },
  username: {
    position: "absolute",
    color: "white",
    top: 283,
    left: 75,
  },

  bio: {
    position: "absolute",
    color: "white",
    fontSize: 15,
    width: 400,
    top: 312,
    left: 8,
    fontWeight: "800",
  },

  followbutton: {
    position: "absolute",
    resizeMode: "contain",
    width: 100,
    left: 10,
    top: 320,
  },
  profileImage: {
    position: "absolute",
    left: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
    top: 250,
    borderRadius: 100,
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    bottom: 300,
  },
  photoBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 20,
  },
  videosBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 165,
  },
  wrapBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 305,
  },
  testButton: {
    position: "absolute",
  },
  paywall: {
    position: "absolute",
  },
  photosDiv: {
    position: "absolute",
  },
  videosDiv: {
    position: "absolute",
  },
  wrapsDiv: {
    position: "absolute",
  },
  photosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 45,
  },
  videosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 190,
  },
  wrapsTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 330,
  },
  photosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 55,
  },
  videosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 200,
  },
  wrapsLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 350,
  },
  accessButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 190,
    height: 61,
    top: 720,
    left: 120,
  },
  userBannerFader: {
    width: 455,

    height: 455,
  },
});
