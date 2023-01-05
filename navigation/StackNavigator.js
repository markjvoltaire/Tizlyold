import { View, Text } from "react-native";
import React from "react";

import Explore from "../screens/Explore";
import HomeScreen from "../screens/HomeScreen";
import Notifications from "../screens/Notifications";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import Welcome from "../screens/Welcome";
import UserProfile from "../screens/UserProfile";
import Post from "../screens/Post";
import UserProfileSubscribers from "../screens/UserProfileSubscribers";
import UserProfilePostDetail from "../screens/UserProfilePostDetail";
import EditPost from "../screens/EditPost";
import ProfileDetail from "../screens/ProfileDetail";
import ImageDetails from "../screens/ImageDetails";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import CommentScreen from "../screens/CommentScreen";
import UserNames from "../screens/UserNames";
import { useUser } from "../context/UserContext";
import GeneralSettings from "../screens/GeneralSettings";

const Stack = createSharedElementStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: false,
};

const HomeStackNavigator = ({ route }) => {
  const { user, setUser } = useUser();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerBackVisible: false,
            headerTitle: () => <Header />,
          }}
        />
        <Stack.Screen name="SettingsScreen" component={Settings} />

        <Stack.Screen
          name="ProfileDetail2"
          component={ProfileDetail}
          options={{
            headerBackVisible: false,
            headerTitle: () => <Header />,
          }}
        />

        <Stack.Screen
          name="UserSub"
          component={UserProfileSubscribers}
          options={{
            headerBackVisible: false,
            headerTitle: () => <Header />,
          }}
        />

        <Stack.Screen
          name="GeneralSettings"
          component={GeneralSettings}
          options={{
            headerBackVisible: false,
            headerTitle: () => <Header />,
          }}
        />

        <Stack.Screen
          name="ImageDetails"
          sharedElements={(route) => {
            const { item } = route.params;
            return [item];
          }}
          component={ImageDetails}
        />

        <Stack.Screen name="UserProfile2" component={UserProfile} />
        <Stack.Screen
          name="UserProfilePost"
          component={UserProfilePostDetail}
        />
        <Stack.Screen
          name="UserSubcriber"
          component={UserProfileSubscribers}
          sharedElements={(route) => {
            const { item } = route.params;
            return [item];
          }}
        />
        <Stack.Screen name="NotificationsScreen" component={Notifications} />
      </Stack.Navigator>
    </>
  );
};

const ExploreStackNavigator = ({ route }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ExploreScreen" component={Explore} />

      <Stack.Screen
        name="ProfileDetail2"
        component={ProfileDetail}
        options={{
          headerBackVisible: false,
          headerTitle: () => <Header />,
        }}
      />

      <Stack.Screen name="NotificationsScreen" component={Notifications} />
    </Stack.Navigator>
  );
};

const NotificationsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="NotificationsScreen" component={Notifications} />
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

const CommentScreenStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
    </Stack.Navigator>
  );
};

const UsernameStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Username" component={UserNames} />
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

const ProfileSubscriberStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserSubcriber" component={UserProfileSubscribers} />
    </Stack.Navigator>
  );
};

const ProfileDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ExploreStackNavigator,
  SettingsStackNavigator,
  WelcomeStackNavigator,
  ProfileStackNavigator,
  UsernameStackNavigator,
  PostStackNavigator,
  CommentScreenStackNavigator,
  ProfileDetailStackNavigator,
  UserProfilePostDetail,
  EditPostStackNavigator,
  NotificationsStackNavigator,
};
