import React from "react";
import { Image, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  ExploreStackNavigator,
  SubscriptionStackNavigator,
  SettingsStackNavigator,
  WelcomeStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigator";
import UserProfile from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/Home.jpg")}
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
                  source={require("../assets/bottomtab/Search.jpg")}
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
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/Subscribers.jpg")}
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
                  Subscriptions
                </Text>
              </View>
            );
          },
        }}
        name="Subscriptions"
        component={SubscriptionStackNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/bottomtab/Profile.jpg")}
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
