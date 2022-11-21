import React, { useState, useEffect } from "react";
import { Image, Text, View, Pressable } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreStackNavigator, HomeStackNavigator } from "./StackNavigator";
import UserProfile from "../screens/UserProfile";

import Notifications from "../screens/Notifications";
import Explore from "../screens/Explore";
import Post from "../screens/Post";

const Tab = createBottomTabNavigator();

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
        component={Post}
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
        component={Notifications}
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
        component={UserProfile}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
