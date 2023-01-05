import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SharedElement } from "react-navigation-shared-element";

import { supabase } from "../services/supabase";

export default function UserProfilePostDetail({ navigation, route }) {
  const { post } = route.params;

  function addNumber(num1, num2) {
    return num1 + num2;
  }

  addNumber(2, 4);

  return (
    <View style={{ flex: 1 }}>
      <SharedElement id={post.id}>
        <Image
          style={{ position: "absolute", height: 200, width: 200, top: 100 }}
          source={post.image}
        />
      </SharedElement>
      <Text style={{ top: 400, fontWeight: "600", fontSize: 20 }}>
        {post.name}
      </Text>
      <Text style={{ top: 400, fontWeight: "600", fontSize: 20 }}>
        {post.title}
      </Text>
      <Button title="go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({});
