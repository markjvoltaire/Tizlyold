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
  useWindowDimensions,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { getPosts } from "../services/user";
import { usePosts } from "../context/PostContext";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../components/home/UserButtons";
import TopHeader from "../components/TopHeader";
import NoPost from "../components/home/NoPost";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();
  const { post, setPost } = usePosts();
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
      setPost(resp);
    };
    getUserPost();
  }, []);

  const posts = post.body;

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(resp.body);
  }

  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
      setLoading(false);
    };
    getUserProfile();
  }, []);

  if (loading) {
    return <Text> Please Wait</Text>;
  }

  const refreshFeed = async () => {
    const resp = await getPosts();
    setPost(resp);
  };

  // console.log("posts", posts.length);

  // if (posts.length === 0) {
  //   return <NoPost navigation={navigation} />;
  // }

  return (
    <View style={styles.homeScreenContainer}>
      <TopHeader navigation={navigation} />

      <View style={styles.feedContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          refreshing={refreshing}
          onRefresh={() => refreshFeed()}
          initialNumToRender={6}
          contentContainerStyle={{
            borderBottomWidth: 0.8,
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
                        media: item.media,
                        description: item.description,
                        title: item.title,
                        id: item.id,
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
                              height: 442,
                              width: 343,
                              borderRadius: 12,
                              position: "relative",
                            }}
                            source={{ uri: item.media }}
                          />
                          {/* <Image
                            style={{
                              top: 507,
                              right: 210,
                              height: 54,
                              width: 64,
                              resizeMode: "contain",
                              position: "absolute",
                            }}
                            source={{ uri: item.category }}
                          /> */}

                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("EditPost", {
                                user_id: item.user_id,
                                description: item.description,
                                title: item.title,
                                id: item.id,
                              })
                            }
                          >
                            <Image
                              style={{
                                position: "absolute",
                                height: 22,
                                width: 22,
                                left: 300,
                                bottom: 468,
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
                          source={require("../assets/bluePhotoButton.png")}
                        />

                        <View style={styles.engagementButtons}>
                          <UserButtons />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.feedContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Player", {
                          id: item.id,
                          username: item.username,
                          profileimage: item.profileImage,
                          displayName: item.displayName,
                          user_id: item.user_id,
                        });
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <View
                          style={{
                            backgroundColor: "black",
                            borderRadius: 12,
                            height: 220,
                            width: 388,
                          }}
                        >
                          <Video
                            source={{ uri: item.media }}
                            ref={video}
                            style={{
                              height: 220,
                              width: 388,
                              borderRadius: 12,
                              alignSelf: "center",
                            }}
                            resizeMode="contain"
                            onPlaybackStatusUpdate={(status) =>
                              setStatus(() => status)
                            }
                          />
                        </View>
                      </View>

                      <Image
                        style={{
                          position: "absolute",
                          width: 50,
                          bottom: 60,
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
                          source={require("../assets/blueVideoButton.png")}
                        />

                        <View style={styles.engagementButtons}>
                          <UserButtons />
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
    backgroundColor: "white",
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
    top: 7,
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
