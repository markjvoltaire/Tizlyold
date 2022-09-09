import React, { useState, useEffect } from "react";
import { Image, Text, View, Pressable } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  ExploreStackNavigator,
  SubscriptionStackNavigator,
  SettingsStackNavigator,
  PostStackNavigator,
  ProfileStackNavigator,
  ProfileSubscriberStackNavigator,
  ProfileDetailStackNavigator,
  NotificationsStackNavigator,
} from "./StackNavigator";
import UserProfile from "../screens/UserProfile";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import Notifications from "../screens/Notifications";

const Tab = createBottomTabNavigator();

async function addPost() {
  const [image, setImage] = useState();
  const [mediaType, setMediaType] = useState("text");
  const { user } = useUser();
  const userId = supabase.auth.currentUser.id;

  const username = user.username;
  const displayName = user.displayName;
  const profileImage = user.profileimage;
  const bannerImage = user.bannerImage;
  const bio = user.bio;
  const followingId = user.following_Id;

  const resp = await supabase.from("post").insert([
    {
      username: username,
      user_id: userId,
      displayName: displayName,
      title: title,
      description: description,
      profileimage: profileImage,
      media: image,
      mediaType: mediaType,
      bannerImage: bannerImage,
      bio: bio,
      category: selected,
      followingId: followingId,
    },
  ]);

  return resp;
}

const pickPost = async (navigation) => {
  // No permissions request is necessary for launching the image library
  let photo = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!photo.cancelled) {
    const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
    const fileName = photo.uri.replace(/^.*[\\\/]/, "");

    var formData = new FormData();
    formData.append("files", {
      uri: photo.uri,
      name: fileName,
      type: photo.type ? `image/${ext}` : `video/${ext}`,
    });

    navigation.navigate("Subscription");

    // try {
    //   const { data, error } = await supabase.storage
    //     .from("posts")
    //     .upload(fileName, formData, {
    //       upsert: true,
    //     });

    //   const { publicURL } = await supabase.storage

    //     .from("posts")
    //     .getPublicUrl(`${fileName}`);

    //   let imageLink = publicURL;
    //   let type = photo.type;

    //   setImage(imageLink);
    //   type = null ? setMediaType("text") : setMediaType(type);

    
    // } catch (e) {
    //   ErrorAlert({ title: "image upload", message: e.message });
    //   return null;
    // }
  }
};

const BottomTabNavigator = (route, navigation) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/HomeLight.jpg")}
                />
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 10,
                    fontWeight: "800",
                    lineHeight: 10,
                    letterSpacing: -0.01,
                    top: 30,
                    right: -6,
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
        name="Home"
        component={HomeStackNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/SearchLight.jpg")}
                />
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 10,
                    fontWeight: "800",
                    lineHeight: 10,
                    letterSpacing: -0.01,
                    top: 30,
                    right: -14,
                  }}
                >
                  Explore
                </Text>
              </View>
            );
          },
        }}
        name="Explore"
        component={ExploreStackNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (navigation) => {
            return (
              <View>
                <Image
                  style={{
                    position: "absolute",
                    left: -24,
                    width: 45,
                    height: 45,
                    resizeMode: "contain",
                    top: -20,
                  }}
                  source={require("../assets/postButton.png")}
                />
              </View>
            );
          },
        }}
        name="Post"
        component={PostStackNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/noti.png")}
                />
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 10,
                    fontWeight: "800",
                    lineHeight: 10,
                    letterSpacing: -0.01,
                    top: 30,
                    right: -25,
                  }}
                >
                  Notifications
                </Text>
              </View>
            );
          },
        }}
        name="Notifications"
        component={NotificationsStackNavigator}
      />

      {/* <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: false }}
        name="UserSubscriber"
        component={ProfileDetailStackNavigator}
      /> */}

      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/ProfileLight.jpg")}
                />
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 10,
                    fontWeight: "800",
                    lineHeight: 10,
                    letterSpacing: -0.01,
                    top: 30,
                    right: -6,
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
        name="Profile"
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
