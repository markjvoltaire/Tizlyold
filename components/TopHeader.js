import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function TopHeader() {
  const { user } = useUser();
  const [query, setQuery] = useState();
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <SafeAreaView style={styles.componentContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/tizlyicon.jpg")}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <Image
            style={styles.drawer}
            source={require("../assets/drawer.png")}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setQuery(text)}
            value={query}
          />
          <Image
            style={styles.searchIcon}
            source={require("../assets/Search.png")}
          />
        </View>
        <TouchableOpacity>
          <Image
            style={styles.notification}
            source={require("../assets/noti.png")}
          />
        </TouchableOpacity>
      </View>
      <Image style={styles.profileimage} source={{ uri: user.profileimage }} />
      <FullSeperator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: "white",
    height: 150,
  },
  drawer: {
    position: "absolute",
    top: 65,
    left: 14,
  },

  logo: {
    position: "absolute",

    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
  },
  searchInput: {
    position: "absolute",
    top: 57,

    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 25,
    backgroundColor: "#F3F3F9",
    width: 200,
    height: 35,
  },
  searchContainer: {
    alignItems: "center",
  },
  searchIcon: {
    height: 20,
    width: 20,
    top: 63,
    right: 75,
  },
  notification: {
    height: 24,
    width: 24,
    top: 40,
    left: 320,
  },
  profileimage: {
    height: 34,
    width: 34,
    borderRadius: 100,
    left: 370,
    top: 10,
  },
});
