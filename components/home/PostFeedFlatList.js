import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { useFonts } from "expo-font";
import Header from "../home/Header";

import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";
import { getPosts } from "../../services/user";
import { usePosts } from "../../context/PostContext";

export default function PostFeedFlatList({ posts, route, navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const video = React.useRef(null);
  const { post, setPost } = usePosts();
  const [status, setStatus] = React.useState({});

  console.log("posts", posts);

  const pullMe = () => {
    setRefreshing(true);

    useEffect(() => {
      const getUserPost = async () => {
        const resp = await getPosts();
        setPost(resp);
      };
      getUserPost();
    }, []);

    console.log("hello");
    setTimeout(() => {
      setRefreshing(false);
    }, 4000);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          top: 257,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={loading}
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
                    <TouchableOpacity style={{ alignItems: "flex-start" }}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 0.8,
    width: 900,
    left: 1,
    bottom: 10,
    height: 3,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
