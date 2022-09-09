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

export default function TopHeader({ navigation }) {
  const { user, setUser } = useUser();
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(true);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <SafeAreaView style={styles.componentContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("UserProfile2")}>
        <Image
          style={styles.logo}
          source={require("../assets/tizlyicon.jpg")}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => navigation.navigate("Checkout")}>
        <Image
          style={styles.notification}
          source={require("../assets/noti.png")}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Image
          style={styles.setting}
          source={require("../assets/Setting.jpg")}
        />
      </TouchableOpacity>

      <Image
        style={styles.profileimage}
        source={
          user.profileimage === null
            ? require("../assets/noProfilePic.jpeg")
            : { uri: user.profileimage }
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: "white",
    height: 100,
    borderBottomWidth: 2.0,
    borderBottomColor: "#EDEDED",
  },
  setting: {
    position: "absolute",
    height: 29,
    width: 29,
    left: 368,
    top: 17,
  },

  logo: {
    position: "absolute",
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
    alignSelf: "center",
  },
  logoContainer: {
    alignItems: "center",
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
    position: "absolute",
    height: 24,
    width: 24,
    top: 20,
    left: 320,
  },
  profileimage: {
    height: 34,
    width: 34,
    borderRadius: 100,
    left: 16,
    top: 12,
  },
});

// searchInput: {
//   position: "absolute",
//   top: 57,
//   paddingLeft: 63,

//   borderColor: "grey",
//   borderWidth: 0.1,
//   borderRadius: 25,
//   backgroundColor: "#F3F3F9",
//   width: 200,
//   height: 35,
// },
