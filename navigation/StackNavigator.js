import { View, Text } from "react-native";
import React from "react";

import Explore from "../screens/Explore";
import HomeScreen from "../screens/HomeScreen";
import Subscriptions from "../screens/Subscriptions";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import Welcome from "../screens/Welcome";
import UserProfile from "../screens/UserProfile";
import Post from "../screens/Post";
import UserProfileSubscribers from "../screens/UserProfileSubscribers";
import UserProfilePostDetail from "../screens/UserProfilePostDetail";
import EditPost from "../screens/EditPost";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          headerTitle: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};

const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ExploreScreen" component={Explore} />
    </Stack.Navigator>
  );
};

const SubscriptionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SubscriptionScreen" component={Subscriptions} />
    </Stack.Navigator>
  );
};

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SettingsScreen" component={Settings} />
    </Stack.Navigator>
  );
};

const WelcomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="WelcomeScreen" component={Welcome} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserScreen" component={UserProfile} />
    </Stack.Navigator>
  );
};

const UsernameStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Username" component={Username} />
    </Stack.Navigator>
  );
};

const UserProfilePostDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserProfilePost" component={UserProfilePostDetail} />
    </Stack.Navigator>
  );
};

const PostStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="PostScreen" component={Post} />
    </Stack.Navigator>
  );
};

const EditPostStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="EditPostScreen" component={EditPost} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const ProfileSubscriberStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserSubcriber" component={UserProfileSubscribers} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ExploreStackNavigator,
  SubscriptionStackNavigator,
  SettingsStackNavigator,
  WelcomeStackNavigator,
  ProfileStackNavigator,
  MainStackNavigator,
  UsernameStackNavigator,
  PostStackNavigator,
  ProfileSubscriberStackNavigator,
  UserProfilePostDetail,
  EditPostStackNavigator,
};
