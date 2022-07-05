import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomTabNavigator from "../navigation/TabNavigator";
import ProfileNav from "../components/profile/ProfileNav";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";

export default function UserProfile({ navigation }) {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(data);
  }

  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
      setLoading(false);
    };
    getUserProfile();
  }, []);

  if (loading) {
    return <Text> Please Wait</Text>;
  }

  const uploadFromUri = async (photo) => {
    const userId = supabase.auth.currentUser.id;

    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);

      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, formData, {
          upsert: false,
        });

      const { publicURL } = await supabase.storage
        .from("profile-images")
        .getPublicUrl(`${fileName}`);

      const resp = await supabase
        .from("profiles")
        .update({ profileimage: publicURL })
        .eq("user_id", userId);

      console.log("error", error);

      useEffect(() => {
        const getUserProfile = async () => {
          await getUserById();
          setLoading(false);
        };
        getUserProfile();
      }, [photo]);

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      console.log(photo);
      return await uploadFromUri(photo);
    } catch (e) {
      ErrorAlert({ title: "image upload", message: e.message });
      return null;
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image
        style={styles.userBanner}
        source={{
          uri: user.bannerImage,
        }}
      />

      <Image
        style={styles.userBanner}
        source={require("../assets/fader.png")}
      />

      <TouchableOpacity
        onPress={async () => {
          const resp = await pickImage();

          if (resp?.imageData) {
            setImage(resp.uri);
            setImageData(resp?.imageData);
          }
        }}
      >
        <Image
          style={styles.profileImage}
          source={{
            uri: user.profileimage,
          }}
        />
      </TouchableOpacity>

      {/* <Button
        style={styles.testButton}
        title="press me "
        onPress={() => {
          console.log(user);
        }}
      /> */}

      <View style={styles.userinfoContainer}>
        <Text style={styles.displayname}>{user.displayName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
      <ProfileNav />
      <FullSeperator />

      <View style={styles.paywall}>
        <View style={styles.photosDiv}>
          <Image
            style={styles.photoBox}
            source={require("../assets/subBox.png")}
          />
          <Text style={styles.photosTextTitle}>Photos</Text>
          <Text style={styles.photosLength}>18</Text>
        </View>
        <View style={styles.videosDiv}>
          <Image
            style={styles.videosBox}
            source={require("../assets/subBox.png")}
          />
          <Text style={styles.videosTextTitle}>Videos</Text>
          <Text style={styles.videosLength}>32</Text>
        </View>
        <View style={styles.wrapsDiv}>
          <Image
            style={styles.wrapBox}
            source={require("../assets/subBox.png")}
          />
          <Text style={styles.wrapsTextTitle}>Wraps</Text>
          <Text style={styles.wrapsLength}>9</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.accessButton}
            source={require("../assets/accessButton.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <Image
            style={styles.editButton}
            source={require("../assets/editprofile.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    right: -10,
    height: 455,
  },
  editButton: {
    position: "absolute",
    resizeMode: "contain",
    top: 410,
    width: 160,
    height: 30,
    left: -15,
  },

  displayname: {
    position: "absolute",
    height: 38,
    left: 75,
    right: 64.27,
    top: 253,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  username: {
    position: "absolute",
    color: "white",
    top: 283,
    left: 75,
  },

  bio: {
    position: "absolute",
    color: "white",
    fontSize: 13,
    width: 400,
    top: 325,
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
    top: 250,
    borderRadius: 100,
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
    top: 470,
  },
  photoBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 20,
  },
  videosBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 165,
  },
  wrapBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 305,
  },
  testButton: {
    position: "absolute",
  },
  paywall: {
    position: "absolute",
  },
  photosDiv: {
    position: "absolute",
  },
  videosDiv: {
    position: "absolute",
  },
  wrapsDiv: {
    position: "absolute",
  },
  photosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 45,
  },
  videosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 190,
  },
  wrapsTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 330,
  },
  photosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 55,
  },
  videosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 200,
  },
  wrapsLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 350,
  },
  accessButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 190,
    height: 61,
    top: 720,
    left: 120,
  },
});
