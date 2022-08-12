import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileNav from "../components/profile/ProfileNav";
import UserButtons from "../components/home/UserButtons";
import UserProfileFeed from "../components/profile/UserProfileFeed";
import UserProfileNav from "../components/profile/UserProfileNav";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { getCurrentUserPosts, getProfileDetail } from "../services/user";
import ProfileDetailSub from "../components/profile/ProfileDetailSub";

export default function ProfileDetail({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

console.log('posts', posts)
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  async function getPosts() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: false });

    return post;
  }

  useEffect(() => {
    const getPost = async () => {
      const resp = await getPosts();
      setPosts(resp);
      setLoading(false);
      // console.log("resp from curren user Post", resp);
    };
    getPost();
  }, []);

  const user_id = route.params.user_id;

  // console.log("user", user);

  // console.log("route", route);

  if (route.params.user_id === user.user_id) {
    navigation.navigate("Profile");
  }

  async function getUserPostsById() {
    const items = await supabase
      .from("post")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: false });

    return items.body;
  }

  async function getProfileDetail() {
    const resp = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user_id);

    return resp.body;
  }

  useEffect(() => {
    const getFeed = () => {
      getUserPostsById().then((res) => setUserPosts(res));
      setLoading(false);
    };
    getFeed();
  }, []);

  if (loading) {
    return <Text>Please Wait</Text>;
  }

  console.log('route', route)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      
        <Image
          style={styles.userBanner}
          source={{ uri: route.params.bannerImage }}
        />

        <Image
          style={styles.userBannerFader}
          source={require("../assets/fader.png")}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backButton}
            source={require("../assets/backButton2.png")}
          />
        </TouchableOpacity>

        <View style={{ bottom: 410 }}>
          <Text style={styles.displayname}>{route.params.displayName}</Text>
          <Text style={styles.username}>@{route.params.username}</Text>
          <Text style={styles.bio}> {route.params.bio}</Text>
          <Image
            style={styles.profileImage}
            source={{ uri: route.params.profileimage }}
          />
          <TouchableOpacity>
            <Image
              style={styles.subButton}
              source={require("../assets/subscribe.png")}
            />
          </TouchableOpacity>
        </View>
        <UserProfileNav />

       {posts.map((post) => {
        return (
          <View  style={{  top: 60}} key={post.id}>
            <View style={{ alignContent: 'center', alignSelf: 'center', left: 15}} >
            <Image style={{ borderRadius: 100, height: 30, width: 30, top: 5, right: 35}} 
            source={{uri: post.profileimage}}
            />
            

            <Text style={styles.postDisplayname}>{post.displayName}</Text>
            <Text style={styles.postUsername}>@{post.username} </Text>
           
            </View>

            <Image style={styles.media} source={{uri: post.media}} />

            <View>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            </View>
            <Image  
                          style={{
                            
                            left: 32,
                            height: 54,
                            width: 64,
                            resizeMode: "contain",
                          }}
                          source={require("../assets/bluePhotoButton.png")}
                        />
                        <View style={{paddingBottom: 180}}>

                        
                        <View>
                          <FullSeperator />
                        </View>
                        </View>
            
          </View>
        )
       })}
        
       

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },

  title: {
    left: 35,
    fontWeight: "800",
    fontSize: 15,
    paddingBottom: 15,
    top: 8
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
    alignSelf: 'center',
    
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
    bottom: 27
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
  subButton: {
    resizeMode: "contain",
    top: 360,
    width: 160,
    height: 30,
    right: 15,
  },

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: .8,
    width: 900,
    left: 1,
    top: 130
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
    top: 320,
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
