import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

import { supabase } from "../services/supabase";

export default function UserProfilePostDetail({ navigation }) {
  return (
    <View>
      <Text>UserProfilePostDetail</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
