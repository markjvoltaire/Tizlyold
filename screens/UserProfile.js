import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomTabNavigator from "../navigation/TabNavigator";
import ProfileNav from "../components/profile/ProfileNav";
import getUserEmail, { getUser } from "../services/user";
import { supabase } from "../services/supabase";

export default function UserProfile({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      const data = await getUserEmail();
      setUserEmail(data);
      setLoading(false);
      console.log("userEmail", userEmail);
    };
    fetchEmail();
  }, []);

  const FullSeperator = () => <View style={styles.fullSeperator} />;
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
        <Text style={styles.displayname}>
          {supabase.auth.currentUser.email}
        </Text>
        <Text style={styles.username}>@desibanks</Text>
        <Text style={styles.bio}>
          God1st 🙏 Actor/Comedian/Entertainer/Host IG: IAMDESIBANKS
          FaceBook:iamdesibanks Business: Iamdesibanks@gmail.com
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
      <Button
        title="press me"
        onPress={() => console.log(supabase.auth.currentUser.email)}
      />
      <ProfileNav />
      <FullSeperator />
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
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 460,
  },
});
