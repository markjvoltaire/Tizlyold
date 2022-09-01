import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getLikes, getAllUsers } from "../services/user";
import { supabase } from "../services/supabase";
import TopHeader from "../components/TopHeader";
import { useUser } from "../context/UserContext";
import NotificationsView from "../components/notifications/NotificationsView";

export default function Notifications({ navigation, route, image }) {
  const { user, setUser } = useUser();

  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const userId = supabase.auth.currentUser.id;
    const likes = await supabase
      .from("likes")
      .select("*")
      .eq("creatorId", userId)
      .eq("liked", true);

    return likes;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const resp = await getNotifications();

      setNotifications(resp.body);
    };
    fetchNotifications();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopHeader navigation={navigation} />
      <Text
        style={{
          fontWeight: "700",
          color: "#4F4E4E",
          alignSelf: "center",
          fontSize: 20,
          top: 25,
        }}
      >
        Notifications
      </Text>

      <NotificationsView notifications={notifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "white",
  },
  row: {
    justifyContent: "space-evenly",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  searchInput: {
    top: 15,
    alignSelf: "center",
    paddingLeft: 63,
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: "#F3F3F9",
    width: 300,
    height: 45,
  },
  searchIcon: {
    height: 20,
    width: 20,
    bottom: 20,
    left: 80,
  },
});
