import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import react from "react";
import { supabase } from "../services/supabase";

import { useUser } from "../context/UserContext";

import BackHeader from "../components/BackHeader";

import { Appearance, useColorScheme } from "react-native";

export default function Settings({ navigation }) {
  const { user, setUser } = useUser();

  async function signOutUser() {
    await supabase.auth.signOut();
  }

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const scheme = useColorScheme();

  const themeTextStyle = scheme === "light" ? "black" : "white";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#121212",
      }}
    >
      <BackHeader scheme={scheme} navigation={navigation} />
      <Text
        style={{
          fontWeight: "700",
          fontSize: 18,
          top: 165,
          position: "absolute",
          left: 100,
          color: themeTextStyle,
        }}
      >
        {user.username}
      </Text>
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 100,
          top: 150,
          left: 10,
          position: "absolute",
        }}
        source={
          user.profileimage
            ? { uri: user.profileimage }
            : require("../assets/noProfilePic.jpeg")
        }
      />

      <View
        style={{ position: "absolute", top: height * 0.3, left: width * 0.05 }}
      ></View>

      <View
        style={{ position: "absolute", top: height * 0.4, left: width * 0.05 }}
      ></View>

      <View style={{ position: "absolute", alignSelf: "center", top: 400 }}>
        <TouchableOpacity onPress={() => signOutUser()}>
          <Image
            style={{
              position: "absolute",
              height: 54,
              width: 315,
              right: -160,
              top: height * 0.28,
            }}
            source={require("../assets/signOut.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileimage: {
    height: 30,
    width: 30,
    borderRadius: 100,
    left: 296,
    top: 12,
  },

  logo: {
    position: "absolute",
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
    alignSelf: "center",
    top: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
  },

  signoutButton: {
    position: "absolute",
    height: 54,
    width: 315,
    right: -160,
    top: 250,
  },
  usernameInput: {
    position: "absolute",
    left: 55,
    top: 370,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  button: {
    position: "absolute",
    resizeMode: "contain",
    width: 300,
    left: -150,
  },
  accountSettingsText: {
    left: 39,
    bottom: 20,
    fontWeight: "400",
  },
  arrow: {
    position: "absolute",
    height: 13,
    width: 13,
    left: 350,
    top: 7,
  },
  accountSettings: {
    position: "absolute",
    right: 280,
    bottom: 500,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  username: {
    fontSize: 23,
    right: 15,
    bottom: 145,
    position: "absolute",
  },
});
