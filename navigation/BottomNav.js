import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  ExploreStackNavigator,
  SubscriptionStackNavigator,
  SettingsStackNavigator,
  PostStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigator";

export default function BottomNav() {
  const Tab = createBottomTabNavigator();
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
        component={Nun}
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
          tabBarIcon: () => {
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
                  source={require("../assets/bottomtab/SubscribersLight.jpg")}
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
}

const styles = StyleSheet.create({});
