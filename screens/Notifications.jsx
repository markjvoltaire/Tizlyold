import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import { supabase } from "../services/supabase";
import { Video } from "expo-av";
import { Appearance, useColorScheme } from "react-native";

export default function Notifications({ navigation }) {
  const { user, setUser } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [likeDates, setLikeDates] = useState();
  const [commentDates, setCommentDates] = useState();
  const video = React.useRef(null);
  const refreshFeed = async () => {
    console.log("REFRESHING");
  };

  const scheme = useColorScheme();

  const getNotifications = async () => {
    const userId = supabase.auth.currentUser.id;
    const likes = await supabase
      .from("notifications")
      .select("*")
      .eq("creatorId", userId)
      .neq("userId", userId);

    return likes;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const resp = await getNotifications();

      console.log("resp", resp);

      setNotifications(resp.body);
    };
    fetchNotifications();
  }, []);

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const themeTextStyle = scheme === "light" ? "black" : "white";

  return (
    <View
      style={{
        backgroundColor: scheme === "dark" ? "black" : "white",
        flex: 1,
      }}
    >
      <View style={{ paddingBottom: height * 0.07 }}>
        <Header user={user} navigation={navigation} />
      </View>

      {notifications.length === 0 ? (
        <ScrollView style={{ alignSelf: "center", flex: 1 }}>
          <View style={{ top: 100 }}>
            <Text style={{ color: themeTextStyle }}>No Notifications</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshFeed()}
            />
          }
        >
          <Text
            style={{
              alignSelf: "center",
              paddingBottom: height * 0.05,
              top: height * 0.02,
              fontWeight: "bold",
              color: themeTextStyle,
            }}
          >
            Notifications
          </Text>

          {notifications.map((item) => {
            if (item.eventType === "like") {
              return (
                <TouchableOpacity
                  onPress={() => navigation.push("PostDetails", { item })}
                  key={item.id}
                  style={{
                    paddingBottom: height * 0.02,
                    left: width * 0.02,

                    flexDirection: "row",

                    marginBottom: 10,
                    paddingBottom: 15,
                  }}
                >
                  <Image
                    source={{ uri: item.userProfileImage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.userTextContainer}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: themeTextStyle,
                      }}
                    >
                      {item.userDisplayname}
                    </Text>

                    <Text style={{ fontWeight: "bold", color: themeTextStyle }}>
                      Liked Your Post
                    </Text>

                    {item.mediaType === "image" ? (
                      <Image
                        style={{
                          width: width * 0.09,
                          aspectRatio: 1,
                          borderRadius: 8,
                          left: width * 0.75,
                          bottom: height * 0.035,
                        }}
                        source={{ uri: item.media }}
                      />
                    ) : (
                      <Video
                        style={{
                          width: width * 0.09,
                          aspectRatio: 1,
                          borderRadius: 8,
                          left: width * 0.75,
                          bottom: height * 0.035,
                        }}
                        source={{ uri: item.media }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }

            /////////////COMMENTS/////////////////////////////////////

            if (item.eventType === "comment") {
              return (
                <TouchableOpacity
                  onPress={() => navigation.push("PostDetails", { item })}
                  key={item.id}
                  style={{
                    paddingBottom: height * 0.02,
                    left: width * 0.02,

                    flexDirection: "row",

                    marginBottom: 10,
                    paddingBottom: 15,
                  }}
                >
                  <Image
                    source={{ uri: item.userProfileImage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.userTextContainer}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: themeTextStyle,
                      }}
                    >
                      {item.userDisplayname}
                    </Text>

                    <Text style={{ fontWeight: "bold", color: themeTextStyle }}>
                      Commented: {item.comment}
                    </Text>

                    {item.mediaType === "image" ? (
                      <Image
                        style={{
                          width: width * 0.09,
                          aspectRatio: 1,
                          borderRadius: 8,
                          left: width * 0.75,
                          bottom: height * 0.035,
                        }}
                        source={{ uri: item.media }}
                      />
                    ) : (
                      <Video
                        style={{
                          width: width * 0.09,
                          aspectRatio: 1,
                          borderRadius: 8,
                          left: width * 0.75,
                          bottom: height * 0.035,
                        }}
                        source={{ uri: item.media }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      )}
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
