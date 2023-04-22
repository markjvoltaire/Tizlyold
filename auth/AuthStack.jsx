import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import Notifications from "../screens/Notifications";
import Settings from "../screens/Settings";
export default function AuthStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Explore"
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Notifications"
        component={Notifications}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
