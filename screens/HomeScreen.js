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
import PostFeedFlatList from "../components/home/PostFeedFlatList";
import Header from "../components/home/Header";
import { usePosts } from "../context/PostContext";
import NoPost from "../components/home/NoPost";
import { Video, AVPlaybackStatus } from "expo-av";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();
  const { post, setPost } = usePosts();
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  async function getUser() {
    const userId = supabase.auth.currentUser.id;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(data);
  }

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
      setPost(resp);
    };
    getUserPost();
  }, []);

  const posts = post.body;
  // console.log("posts from context", posts);

  useEffect(() => {
    const getUserProfile = async () => {
      await getUser();
    };
    getUserProfile();
  }, []);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  if (user === null) {
    navigation.navigate("Username");
  }

  const pullMe = async () => {
    const resp = await getPosts();
    setPost(resp);
    console.log("resp", resp);
  };

  return (
    <>
      <>
        <View style={styles.container}>
          <StatusBar style="dark" />
          {/* <View style={{ bottom: 57 }}>
            <PostFeedFlatList navigation={navigation} posts={posts} />
          </View> */}

          <>
            <View
              style={{
                backgroundColor: "white",
                top: 257,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                keyExtractor={(item) => item.id}
                data={posts}
                refreshing={refreshing}
                onRefresh={() => pullMe()}
                initialNumToRender={4}
                contentContainerStyle={{
                  borderBottomWidth: 0.8,
                  borderBottomColor: "#EDEDED",
                }}
                renderItem={({ item }) => (
                  <>
                    <View style={{ paddingBottom: 100, alignItems: "center" }}>
                      <FullSeperator />
                      <View style={{ alignItems: "center", top: 19 }}>
                        <View style={{ alignItems: "flex-start" }}>
                          <TouchableOpacity
                            style={{ alignItems: "flex-start" }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                textAlign: "center",
                              }}
                            >
                              {item.DisplayName}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "600",
                                color: "#73738B",
                                textAlign: "center",
                              }}
                            >
                              @{item.username}
                            </Text>
                            <Image
                              style={{
                                borderRadius: 100,
                                height: 37,
                                width: 37,
                                right: 40,
                                bottom: 36,
                              }}
                              source={{ uri: item.profileImage }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <View>
                          {item.mediaType === "image" ? (
                            <Image
                              style={{
                                height: 392,
                                width: 343,
                                borderRadius: 12,
                              }}
                              source={{ uri: item.media }}
                            />
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("Player", {
                                  id: item.id,
                                  username: item.username,
                                  profileimage: item.profileImage,
                                  displayName: item.DisplayName,
                                  path: item.username,
                                  title: item.title,
                                  mediaType: item.mediaType,
                                  media: item.media,
                                  description: item.description,
                                  route: item.id,
                                });
                              }}
                            >
                              <View>
                                <Video
                                  source={{ uri: item.media }}
                                  ref={video}
                                  style={{
                                    height: 239,
                                    width: 397,
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                  }}
                                  resizeMode="cover"
                                  onPlaybackStatusUpdate={(status) =>
                                    setStatus(() => status)
                                  }
                                />
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{ top: 10 }}>
                          <Text
                            style={{
                              fontWeight: "800",
                              fontSize: 12,
                              paddingBottom: 12,
                            }}
                          >
                            {item.title}
                          </Text>

                          <Text
                            style={{
                              fontWeight: "400",
                              color: "#5C5C5C",
                            }}
                          >
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              />
            </View>
          </>
        </View>
        <View style={{ top: 280, backgroundColor: "white" }}>
          <View style={{ top: 120 }}>
            <View style={{ height: 200, width: 200 }}></View>
            <Header navigation={navigation} />
          </View>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  whyHeader: {
    position: "absolute",
    left: 88,
    top: 321,
  },

  howHeader: {
    position: "absolute",
    left: 88,
    top: 500,
  },

  why: {
    fontWeight: "800",
    color: "#4A90E2",
    fontSize: 20,
  },
  how: {
    fontWeight: "800",
    color: "#4A90E2",
    fontSize: 20,
  },

  whyDiv: {
    position: "absolute",
    color: "#686877",
    fontWeight: "500",
    width: 252,
    left: 88,
    top: 360,
  },
  howDiv: {
    position: "absolute",
    color: "#686877",
    fontWeight: "500",
    width: 252,
    left: 88,
    top: 540,
  },
  whyIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    bottom: 425,
    left: 40,
  },
  howIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    left: 40,
    bottom: 230,
  },

  whyText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
  },

  howText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
  },

  pageHeader: {
    position: "absolute",
    fontWeight: "800",
    fontSize: 20,
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
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
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
});
