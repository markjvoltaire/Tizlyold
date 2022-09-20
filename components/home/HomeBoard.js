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
  const HalfSeperator = () => <View style={styles.halfSeperator} />;
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <View style={styles.homeboardContainer}>
            <Image
              style={styles.homeboard}
              source={require("../../assets/exploreBoardBig.png")}
            />
          </View>
        </TouchableOpacity>
        <HalfSeperator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  halfSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0,
    width: 298,
    top: 70,
  },

  title: {
    fontWeight: "600",
    fontSize: 15,
    position: "absolute",
    left: 20,
    top: 20,
  },

  homeboard: {
    height: 210,
    resizeMode: "contain",
    alignSelf: "center",
    bottom: 20,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    bottom: 13,
    left: 9,
  },
  homeboardContainer: {
    top: 50,
  },
});
