import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackNavigator } from "./navigation/StackNavigator";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Explore from "./screens/Explore";
import Settings from "./screens/Settings";
import Subscriptions from "./screens/Subscriptions";
import Header from "./components/home/Header";

import { UserProvider } from "./context/UserContext";
import UserProfile from "./screens/UserProfile";
import BottomTabNavigator from "./navigation/TabNavigator";
import { ProfileStackNavigator } from "./navigation/StackNavigator";
import "react-native-url-polyfill/auto";
import UserNames from "./screens/UserNames";
import Post from "./screens/Post";
import SignUpSuccess from "./screens/SignUpSuccess";
import EditProfile from "./screens/EditProfile";
import ProfileDetail from "./screens/ProfileDetail";
import BioScreen from "./screens/BioScreen";
import ProfileImage from "./screens/ProfileImage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Username"
            component={UserNames}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignupSuccess"
            component={SignUpSuccess}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Explore"
            component={Explore}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Bio"
            component={BioScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Subscriptions"
            component={Subscriptions}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Post"
            component={Post}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Root"
            component={ProfileStackNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
