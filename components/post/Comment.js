import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

export default function Comment({ route }) {
  const [comment, setComment] = useState("");
  const { user, setUser } = useUser();
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  async function createComment() {
    const resp = await supabase.from("comments").insert([
      {
        creatorId: route.params.user_id,
        userId: user.user_id,
        comment: comment,
        userProfileImage: user.profileimage,
        postId: route.params.id,
        userDisplayName: user.displayName,
        userUsername: user.username,
      },
    ]);
  }

  return (
    <View style={{ left: 30 }}>
      <TouchableOpacity
        onPress={() => {
          createComment();
        }}
      >
        <Image
          style={{
            height: 33,
            resizeMode: "contain",
            bottom: 35,
            left: 160,
          }}
          source={require("../../assets/commentPost.png")}
        />
      </TouchableOpacity>
      <TextInput
        autoCapitalize="none"
        autoCorrect={true}
        placeholder="Leave A Comment"
        onChangeText={(text) => setComment(text)}
        style={styles.commentInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 10,
    backgroundColor: "#E1E1EA",
    width: 230,
    height: 33,
    bottom: 67,
    paddingLeft: 20,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 9.8,
    width: 900,
    right: 40,
    top: 19,
    height: 3,
  },
});
