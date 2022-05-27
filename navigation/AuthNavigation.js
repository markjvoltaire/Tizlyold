import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Explore from "../screens/Explore";
import Subscriptions from "../screens/Subscriptions";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Explore">
        <Stack.Screen
          options={{ headerShown: true }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Subscription" component={Subscriptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
