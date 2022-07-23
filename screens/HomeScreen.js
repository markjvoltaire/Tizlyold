import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { StatusBar } from "expo-status-bar";

import { useUser } from "../context/UserContext";
import { getPosts } from "../services/user";
import PostFeed from "../components/home/PostFeed";

import { usePosts } from "../context/PostContext";
import NoPost from "../components/home/NoPost";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../components/home/UserButtons";
import TopHeader from "../components/TopHeader";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();
  const { post, setPost } = usePosts();
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  console.log("user", user);
  console.log("posts", posts);
  console.log("supabase", supabase.auth.currentUser.id);

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
      setPost(resp);
    };
    getUserPost();
  }, []);

  const posts = post.body;

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const FullSeperator2 = () => <View style={styles.fullSeperator2} />;

  if (user === null) {
    navigation.navigate("Username");
  }

  const refreshFeed = async () => {
    const resp = await getPosts();
    setPost(resp);
    console.log("resp", resp);
  };

  console.log("posts", posts);

  return (
    <View style={styles.homeScreenContainer}>
      <TopHeader navigation={navigation} />

      <View style={styles.feedContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          refreshing={refreshing}
          onRefresh={() => refreshFeed()}
          initialNumToRender={4}
          contentContainerStyle={{
            borderBottomWidth: 2.8,
            borderBottomColor: "#EDEDED",
          }}
          renderItem={({ item }) => (
            <View style={styles.feedContainer}>
              <View style={styles.userInfo}>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProfileDetail", {
                        user_id: item.user_id,
                        bannerImage: item.bannerImage,
                        username: item.username,
                        displayName: item.displayName,
                        profileImage: item.profileImage,
                        bio: item.bio,
                      })
                    }
                  >
                    <Image
                      style={styles.postFeedUserProfilePic}
                      source={{ uri: item.profileImage }}
                    />
                    <View style={styles.userProfileInfo}>
                      <Text style={styles.postFeedUserDisplayName}>
                        {item.displayName}
                      </Text>
                      <Text style={styles.postFeedUsername}>
                        @{item.username}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.userContentContainer}>
                {item.mediaType === "image" ? (
                  <View>
                    <View>
                      {item.user_id === user.user_id ? (
                        <>
                          <Image
                            style={{
                              height: 392,
                              width: 343,
                              borderRadius: 12,
                            }}
                            source={{ uri: item.media }}
                          />
                          <Image
                            style={{
                              top: 457,
                              right: 210,
                              height: 54,
                              width: 64,
                              resizeMode: "contain",
                              position: "absolute",
                            }}
                            source={{ uri: item.category }}
                          />
                          <TouchableOpacity>
                            <Image
                              style={{
                                position: "absolute",
                                height: 22,
                                width: 22,
                                left: 300,
                                bottom: 418,
                                resizeMode: "contain",
                              }}
                              source={require("../assets/optionsButton.png")}
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <Image
                          style={{
                            height: 392,
                            width: 343,
                            borderRadius: 12,
                          }}
                          source={{ uri: item.media }}
                        />
                      )}
                    </View>

                    <View style={styles.postInfoContainer}>
                      <View style={styles.postInfo}>
                        <View style={styles.postTitleContainer}>
                          <Text style={styles.postTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={styles.description}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.photoBeanContainer}>
                        <Image
                          style={{
                            top: 30,
                            right: 2,
                            height: 54,
                            width: 64,
                            resizeMode: "contain",
                          }}
                          source={require("../assets/photoBean.png")}
                        />

                        <View style={styles.engagementButtons}>
                          <UserButtons />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.feedContainer}>
                    <Video
                      source={{ uri: item.media }}
                      ref={video}
                      style={{
                        position: "absolute",
                        maxHeight: 392,
                        maxWidth: 338,
                        height: "100%",
                        width: "100%",
                        borderRadius: 12,
                        alignItems: "center",
                      }}
                      resizeMode="cover"
                      onPlaybackStatusUpdate={(status) =>
                        setStatus(() => status)
                      }
                    />
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Player", {
                            id: item.id,
                            username: item.username,
                            profileimage: item.profileImage,
                            displayName: item.displayName,
                            path: item.username,
                            title: item.title,
                            mediaType: item.mediaType,
                            media: item.media,
                            description: item.description,
                            route: item.id,
                          });
                        }}
                      >
                        <Image
                          style={{
                            height: 392,
                            width: 343,
                            borderRadius: 12,
                          }}
                          source={{ uri: item.media }}
                        />

                        <Image
                          style={{
                            position: "absolute",
                            width: 50,
                            top: 160,
                            alignSelf: "center",
                            resizeMode: "contain",
                          }}
                          source={require("../assets/playButton.png")}
                        />
                      </TouchableOpacity>
                      <View style={styles.postInfoContainer}>
                        <View style={styles.postInfo}>
                          <View style={styles.postTitleContainer}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.photoBeanContainer}>
                          <Image
                            style={{
                              top: 30,
                              right: 2,
                              height: 54,
                              width: 64,
                              resizeMode: "contain",
                            }}
                            source={require("../assets/videoBean.png")}
                          />

                          <View style={styles.engagementButtons}>
                            <UserButtons />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    backgroundColor: "grey",
    justifyContent: "center",
  },

  profileimage: {
    width: 100,
  },
  exploreButton: {
    position: "absolute",
    width: 213,
    height: 40,
  },

  exploreButtonDiv: {
    right: 105,
    alignItems: "center",
    top: 300,
  },

  fullSeperator: {
    position: "absolute",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 300,
    bottom: 460,
  },

  fullSeperator2: {
    position: "absolute",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    top: 50,
  },

  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 270.7,
    width: 29,
    height: 29,
  },
  image: {
    width: 900,
    height: 900,
  },
  userBanner: {
    position: "absolute",
    width: 455,
    right: -10,
    height: 455,
  },
  headerContainer: {},
  homeScreenContainer: {
    flex: 1,
    top: 6,
  },
  feedContainer: {
    flex: 1,

    backgroundColor: "white",
  },
  userInfo: {
    alignItems: "center",
    paddingBottom: 10,
    bottom: 10,
    left: 12,
  },
  postFeedUserProfilePic: {
    borderRadius: 100,
    height: 30,
    width: 30,
    right: 37,
    top: 40,
  },
  postFeedUserDisplayName: {
    fontWeight: "600",
    fontSize: 16,
  },
  postFeedUsername: {
    fontWeight: "500",
    color: "#5F5F69",
    fontSize: 12,
    right: 2,
  },

  userContentContainer: {
    alignItems: "center",
  },

  postTitle: {
    fontWeight: "800",
    fontSize: 15,
  },
  description: {
    fontWeight: "600",
    color: "#5F5F69",
    top: 5,
  },
  photoBeanContainer: {
    paddingBottom: 100,
  },

  engagementButtons: {
    alignItems: "center",
    top: 12,
  },
  postInfo: {
    top: 10,
  },
  userProfileInfo: {
    flex: "row",
    top: 8,
  },
  descriptionContainer: {
    top: 3,
  },
});
