import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ProfilePostHeader from "../post/ProfilePostHeader";
import StatusText from "../post/StatusText";
import UserButtons from "../home/UserButtons";
import { Video } from "expo-av";
import PostUserInfo from "./PostUserInfo";
import ProfileImagePost from "./ProfileImagePost";
import ProfileVideoPost from "./ProfileVideoPost";

export default function ProfileFeedList({
  freePosts,
  profile,
  navigation,
  isFollowing,
}) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <View style={{ top: 10, marginBottom: height * 0.7 }}>
      {freePosts.map((item) => {
        return (
          <View key={item.id}>
            {item.mediaType === "image" ? (
              <ProfileImagePost
                profile={profile}
                navigation={navigation}
                item={item}
              />
            ) : null}

            {item.mediaType === "video" ? (
              <ProfileVideoPost
                isFollowing={isFollowing}
                profile={profile}
                navigation={navigation}
                item={item}
              />
            ) : null}
          </View>
        );
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
