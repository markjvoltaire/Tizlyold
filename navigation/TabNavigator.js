import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  ExploreStackNavigator,
  SubscriptionStackNavigator,
  SettingsStackNavigator,
  WelcomeStackNavigator,
} from "./StackNavigator";
import UserProfile from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Explore" component={ExploreStackNavigator} />
      <Tab.Screen name="Subscriptions" component={SubscriptionStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      <Tab.Screen showLabel="false" name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
