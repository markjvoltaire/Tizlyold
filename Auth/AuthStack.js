import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ExploreStackNavigator,
  MainStackNavigator,
} from "../navigation/StackNavigator";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Explore from "../screens/Explore";
import Settings from "../screens/Settings";
import Subscriptions from "../screens/Notifications";
import Checkout from "../screens/Checkout";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import { UserProvider } from "../context/UserContext";

import UserProfile from "../screens/UserProfile";
import BottomTabNavigator from "../navigation/TabNavigator";
import { ProfileStackNavigator } from "../navigation/StackNavigator";
import "react-native-url-polyfill/auto";
import UserNames from "../screens/UserNames";
import Post from "../screens/Post";
import SignUpSuccess from "../screens/SignUpSuccess";
import EditProfile from "../screens/EditProfile";
import ProfileDetail from "../screens/ProfileDetail";
import BioScreen from "../screens/BioScreen";
import UserProfileSubscribers from "../screens/UserProfileSubscribers";
import { PostProvider } from "../context/PostContext";
import Player from "../screens/Player";
import UserProfilePostDetail from "../screens/UserProfilePostDetail";
import EditPost from "../screens/EditPost";
import { FollowProvider } from "../context/FollowContext";
import Notifications from "../screens/Notifications";
import ImageDetails from "../screens/ImageDetails";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import CommentScreen from "../screens/CommentScreen";
import { supabase } from "../services/supabase";
import GeneralSettings from "../screens/GeneralSettings";
import ForgotPassword from "../screens/ForgotPassword";
import { usePosts } from "../context/PostContext";
export default function AuthStack({ route }) {
  const Stack = createSharedElementStackNavigator();

  const { postUploading } = usePosts();

  console.log("post", postUploading);

  return (
    <UserProvider>
      <FollowProvider>
        <PostProvider>
          <Stack.Navigator
            screenOptions={{ headerShown: false, presentation: "card" }}
          >
            <Stack.Screen
              name="HomeScreen"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ImageDetails"
              sharedElements={(route) => {
                const { item } = route.params;

                return [item];
              }}
              component={ImageDetails}
            />

            <Stack.Screen
              name="Player"
              component={Player}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="GeneralSettings"
              component={GeneralSettings}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ExploreScreen"
              component={ExploreStackNavigator}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="EditPost"
              component={EditPost}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="UserProfilePostDetail"
              component={UserProfilePostDetail}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="CommentScreen"
              component={CommentScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="Bio"
              component={BioScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="NotificationsScreen"
              component={Notifications}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="Post"
              component={Post}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="Root"
              component={ProfileStackNavigator}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="ProfileDetail"
              component={ProfileDetail}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="ProfileDetail2"
              component={ProfileDetail}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="ProfileDetail3"
              component={ProfileDetail}
              options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="UserSubscriber"
              component={UserProfileSubscribers}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </PostProvider>
      </FollowProvider>
    </UserProvider>
  );
}
