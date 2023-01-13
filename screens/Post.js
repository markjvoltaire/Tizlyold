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
import React from "react";

import PostForm from "../components/post/PostForm";

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
