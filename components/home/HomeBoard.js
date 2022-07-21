import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

export default function HomeBoard() {
  const { user } = useUser();
  console.log("user", user);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <View style={styles.homeboardContainer}>
            <Text style={styles.username}> Welcome {user.displayName} </Text>
            <Image
              style={styles.homeboard}
              source={require("../../assets/homeBanner.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "white",
  },

  homeboard: {
    height: 200,
    width: 420,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    bottom: 13,
    left: 9,
  },
  homeboardContainer: {
    top: 40,
  },
});
