import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";
import ProfileUserButtons from "./ProfileUserButtons";
import { useUser } from "../../context/UserContext";
import UserProfileImagePost from "./UserProfileImagePost";
import UserProfileVideoPost from "./UserProfileVideoList";
import ProfileHomeView from "./ProfileHomeView";
import ProfileMediaView from "./ProfileMediaView";

export default function UserProfileFeed({
  item,
  navigation,
  route,
  posts,
  post,
  setPosts,
  navState,
  user,
  setUser,
}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  // if (item.mediaType === "image") {
  //   return <UserProfileImagePost item={item} />;
  // }

  // if (item.mediaType === "video") {
  //   return <UserProfileVideoPost item={item} />;
  // }

  if (navState === "home") {
    return (
      <>
        <ProfileHomeView
          navigation={navigation}
          post={post}
          route={route}
          navState={navState}
          setPosts={setPosts}
          item={item}
          user={user}
          setUser={setUser}
        />
      </>
    );
  }

  if (navState === "media") {
    return <ProfileMediaView post={post} />;
  }
}

const styles = StyleSheet.create({
  feedContainer: {
    alignItems: "center",
    top: 20,
  },

  fullSeperator: {
    position: "absolute",
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.4,
    width: 900,
  },
});
