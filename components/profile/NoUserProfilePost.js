import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  ErrorAlert,
  FlatList,
  RefreshControl,
} from "react-native";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";
import React, { useState, useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";

export default function NoUserProfilePost({ navigation, route }) {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stateImage, setStateImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <View>
      <Video
        ref={video}
        source={{ uri: user.bannerImage }}
        isLooping
        shouldPlay={true}
        isMuted={true}
        resizeMode="cover"
        style={styles.userBanner}
      />

      <Image style={styles.userBanner} source={{ uri: user.bannerImage }} />

      <Image
        style={styles.userBannerFader}
        source={require("../../assets/fader.png")}
      />
      <View style={{ bottom: 410 }}>
        <Text style={styles.displayname}>{user.displayName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.bio}> {user.bio}</Text>
        <Image
          style={styles.profileImage}
          source={
            user.profileimage === null
              ? require("../../assets/noProfilePic.jpeg")
              : { uri: user.profileimage }
          }
        />
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Image
            style={styles.subButton}
            source={require("../../assets/editprofile.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          style={styles.settingsButton}
          source={require("../../assets/settings.png")}
        />
      </TouchableOpacity>
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
          You Haven't Uploaded Any Content Yet.
        </Text>
        <Image
          style={{ height: 170, resizeMode: "contain", bottom: 20 }}
          source={require("../../assets/mobile-application.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },

  settingsButton: {
    resizeMode: "contain",
    position: "absolute",
    bottom: 80,
    width: 160,
    height: 29,
    left: 100,
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
  media: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 245,
    fontSize: 16,
  },

  feedContainer: {
    alignItems: "center",
    top: 130,
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
  editButton: {
    position: "absolute",
    resizeMode: "contain",
    bottom: 20,
    width: 160,
    height: 30,
  },

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 429,
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
  subButton: {
    resizeMode: "contain",
    top: 330,
    width: 160,
    height: 30,
    right: 15,
  },

  bio: {
    color: "white",

    fontSize: 15,
    width: 400,
    top: 312,
    alignSelf: "center",
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
    width: 25,
    height: 30,
    left: 41,
    top: 90,
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
  setting: {
    position: "absolute",
    height: 22,
    width: 22,
    left: 308,
    top: 29,
  },
});
