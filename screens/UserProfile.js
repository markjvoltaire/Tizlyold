import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BottomTabNavigator from "../navigation/TabNavigator";
import ProfileNav from "../components/profile/ProfileNav";

export default function UserProfile({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image
        style={styles.userBanner}
        source={require("../assets/desinew.png")}
      />

      <Image
        style={styles.userBanner}
        source={require("../assets/fader.png")}
      />

      <Image
        style={styles.profileImage}
        source={require("../assets/desiProfile.png")}
      />
      <View style={styles.userinfoContainer}>
        <Text style={styles.displayname}>Desi Banks</Text>
        <Text style={styles.username}>@desibanks</Text>
        <Text style={styles.bio}>
          God1st 🙏 Actor/Comedian/Entertainer/Host IG: IAMDESIBANKS
          FaceBook:iamdesibanks Business: Iamdesibanks@gmail.com
        </Text>
        <TouchableOpacity>
          <Image
            style={styles.followbutton}
            source={require("../assets/followbutton.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
      <ProfileNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    right: 0.5,
    height: 455,
  },

  displayname: {
    position: "absolute",
    height: 38,
    left: 75,
    right: 64.27,
    top: 250,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  username: {
    position: "absolute",
    color: "white",
    top: 280,
    left: 75,
  },

  bio: {
    position: "absolute",
    color: "white",
    fontSize: 13,
    width: 400,
    top: 315,
    left: 8,
  },

  followbutton: {
    position: "absolute",
    resizeMode: "contain",
    width: 100,
    left: 10,
    top: 320,
  },
  profileImage: {
    position: "absolute",
    left: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
    top: 295,
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    left: 41,
    top: 90,
  },
});
