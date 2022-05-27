import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  ExploreStackNavigator,
  SubscriptionStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Explore" component={ExploreStackNavigator} />
      <Tab.Screen name="Subscriptions" component={SubscriptionStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
