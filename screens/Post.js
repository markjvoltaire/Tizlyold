import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getUser, getUsers } from "../services/user";
import { supabase } from "../services/supabase";
import { useLinkTo } from "@react-navigation/native";

import PostForm from "../components/post/PostForm";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import PostButtons from "../components/post/PostButtons";

export default function Post({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PostForm navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});
