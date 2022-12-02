import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ErrorAlert,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UpdateLoading from "../components/profile/UpdateLoading";

export default function EditProfile({ navigation }) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const video = React.useRef(null);
  const [image, setImage] = useState(user.profileimage);
  const [banner, setBanner] = useState(user.bannerImage);
  const [username, setUsername] = useState(user.username);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [profilePreview, setProfilePreview] = useState(user.profileimage);
  const [bannerPreview, setBannerPreview] = useState(user.bannerImage);
  const [profilePostURI, setProfilePostURI] = useState({});
  const [bannerPostURI, setBannerPostURI] = useState({});
  const [profileImageLink, setProfileLink] = useState(user.profileimage);
  const [bannerLink, setBannerLink] = useState(user.bannerImage);
  const [updateLoading, setUpdateLoading] = useState(false);

  async function sendAlert() {
    Alert.alert(
      "Changes Have Been Saved",
      "",
      [{ text: "OK", onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  }
  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
    };
    getUserProfile();
  }, []);

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(data);
  }

  if (user === undefined) {
    navigation.navigate("Username");
  }

  if (user.bannerImage === undefined) {
    navigation.navigate("Username");
  }

  const pickProfileImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      canAskAgain: true,
      quality: 0,
    });

    if (!photo.canceled) {
      let newfile = {
        uri: photo.assets[0].uri,
        type: `test/${photo.assets[0].uri.split(".")[1]}`,
        name: `test.${photo.assets[0].uri.split(".")[1]}`,
        mediaType: photo.assets[0].type,
      };

      setProfilePostURI(newfile);
      setProfilePreview(photo.assets[0].uri);
      return newfile;
    }
  };

  const pickBanner = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      canAskAgain: true,
      quality: 0,
      videoMaxDuration: 10,
      videoQuality: 0,
    });

    if (!photo.canceled) {
      let newfile = {
        uri: photo.assets[0].uri,
        type: `test/${photo.assets[0].uri.split(".")[1]}`,
        name: `test.${photo.assets[0].uri.split(".")[1]}`,
        mediaType: photo.assets[0].type,
      };
      setBannerPostURI(newfile);
      setBannerPreview(photo.assets[0].uri);
      return newfile;
    }
  };

  async function profileImageToCloudinary() {
    const data = new FormData();
    data.append("file", profilePostURI);
    data.append("upload_preset", "TizlyUpload");
    data.append("cloud_name", "doz01gvsj");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doz01gvsj/upload",
      {
        method: "post",
        body: data,
      }
    );

    const resp = await response.json();
    updateProfileImage(resp);
  }

  async function bannerToCloudinary() {
    const data = new FormData();
    data.append("file", bannerPostURI);
    data.append("upload_preset", "TizlyUpload");
    data.append("cloud_name", "doz01gvsj");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doz01gvsj/upload",
      {
        method: "post",
        body: data,
      }
    );

    const resp = await response.json();
    updateBanner(resp);
  }

  let profileDisplay;

  if (image === null && user.profileimage === null) {
    profileDisplay = require("../assets/plusButton.png");
  }
  if (image != null) {
    profileDisplay = image;
  } else {
    profileDisplay = user.profileimage;
  }

  let profileBanner;

  if (banner === null && user.bannerImage === null) {
    profileBanner = require("../assets/plusButton.png");
  }
  if (banner != null) {
    profileBanner = banner;
  } else {
    profileBanner = user.bannerImage;
  }

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  async function editProfile() {
    const userId = supabase.auth.currentUser.id;
    setUpdateLoading(true);

    if (profileImageLink != profilePreview) {
      await profileImageToCloudinary();
    }

    if (bannerLink != bannerPreview) {
      await bannerToCloudinary();
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: username,
        displayName: displayName,
        bio: bio,
      })
      .eq("user_id", userId);

    if (error) {
      error.message ===
      'duplicate key value violates unique constraint "profiles_username_key"'
        ? Alert.alert("This Username Is Already Taken")
        : Alert.alert("An error has occured").then(() =>
            setUpdateLoading(false)
          );
    } else {
      setUpdateLoading(false);
      sendAlert();
    }
  }

  async function updateProfileImage(resp) {
    const userId = supabase.auth.currentUser.id;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        profileimage: resp.url,
      })
      .eq("user_id", userId);

    if (error) {
      Alert.alert("An error has occured");
    }
  }

  async function updateBanner(resp) {
    const userId = supabase.auth.currentUser.id;

    console.log("resp", resp);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        bannerImage: resp.url,
        bannerImageType: resp.resource_type,
      })
      .eq("user_id", userId);

    if (error) {
      Alert.alert("An error has occured");
    }
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={styles.pageTitle}>Edit Profile</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>
      <View style={styles.userProfileImages}>
        <TouchableOpacity onPress={() => pickProfileImage()}>
          <Image
            style={{
              position: "absolute",
              left: width * 0.1,
              aspectRatio: 1,

              height: height * 0.13,
              resizeMode: "contain",
              top: height * 0.18,
              borderRadius: 200,
              borderColor: "#5C5C5C",
              borderWidth: 0.2,
            }}
            source={
              profilePreview
                ? { uri: profilePreview }
                : require("../assets/noProfilePic.jpeg")
            }
          />

          <Image
            style={{
              position: "absolute",
              resizeMode: "contain",
              top: height * 0.27,
              height: height * 0.035,

              left: width * 0.15,
            }}
            source={require("../assets/bluePlus.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pickBanner()}>
          {banner.endsWith(".mov") ? (
            <Video
              ref={video}
              source={{ uri: bannerPreview }}
              isLooping
              shouldPlay={true}
              isMuted={true}
              resizeMode="cover"
              style={styles.userBanner}
            />
          ) : (
            <Image
              style={{
                position: "absolute",
                top: height * 0.17,
                height: height * 0.14,
                aspectRatio: 1,
                left: width * 0.6,
                borderRadius: 10,
                borderColor: "#5C5C5C",
                borderWidth: 0.2,
              }}
              source={
                bannerPreview === null
                  ? require("../assets/noProfilePic.jpeg")
                  : { uri: bannerPreview }
              }
            />
          )}
          <Image
            style={{
              position: "absolute",
              resizeMode: "contain",
              top: height * 0.28,
              height: height * 0.035,

              left: width * 0.68,
            }}
            source={require("../assets/bluePlus.png")}
          />
        </TouchableOpacity>
      </View>

      <Image
        style={{
          position: "absolute",
          top: height * 0.17,
          left: width * 0.48,
          height: 120,
        }}
        source={require("../assets/verticleDiv.png")}
      />

      <TextInput
        placeholder="Username"
        style={{
          position: "absolute",
          width: width * 0.78,
          height: height * 0.07,
          borderRadius: 15,
          borderColor: "grey",
          top: height * 0.34,
          alignSelf: "center",
          borderWidth: 0.5,
          paddingLeft: width * 0.07,
        }}
        value={username}
        onChangeText={(text) => setUsername(text.toLowerCase())}
      />
      <TextInput
        placeholder="Display Name"
        style={{
          position: "absolute",
          width: width * 0.78,
          height: height * 0.07,
          borderRadius: 15,
          borderColor: "grey",
          top: height * 0.42,
          alignSelf: "center",
          borderWidth: 0.5,
          paddingLeft: width * 0.07,
        }}
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />

      <TextInput
        placeholder="Bio"
        style={{
          position: "absolute",
          width: width * 0.78,
          height: height * 0.07,
          borderRadius: 15,
          borderColor: "grey",
          top: height * 0.5,
          alignSelf: "center",
          borderWidth: 0.5,
          paddingLeft: width * 0.07,
        }}
        value={bio}
        onChangeText={(text) => setBio(text)}
      />

      {/* {updateLoading === true ? (
        <View
          style={{
            position: "absolute",
            height: height * 0.3,
            aspectRatio: 1,
            backgroundColor: "#EEEEEE",
            alignSelf: "center",
            top: height * 0.35,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <LottieView
            style={{
              height: height * 0.2,
              position: "absolute",
              top: height * 0.03,
            }}
            source={require("../assets/lottie/blueCircle.json")}
            autoPlay
          />
          <Text style={{ fontSize: 15, top: height * 0.03, fontWeight: "600" }}>
            Updating Profile
          </Text>
        </View>
      ) : null} */}

      <TouchableOpacity onPress={() => editProfile()}>
        <Image
          resizeMode="contain"
          style={{
            position: "absolute",
            height: height * 0.062,
            aspectRatio: 1,
            alignSelf: "center",
            top: height * 0.7,
          }}
          source={require("../assets/continueButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  button: {
    position: "absolute",
    width: 311,
    height: 50,
    left: 52,
    top: 600,
  },

  imagesAndInputs: {
    position: "absolute",
  },

  bluePlusProfile: {
    position: "absolute",
    resizeMode: "contain",
    top: 228,
    height: 30,
    width: 30,
    left: 114,
  },

  bluePlusBanner: {
    position: "absolute",
    resizeMode: "contain",
    top: 235,
    height: 30,
    width: 30,
    left: 345,
  },

  logo: {
    position: "absolute",
    resizeMode: "contain",
    height: 39,
    width: 50,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    top: 60,
  },

  pageTitle: {
    position: "absolute",
    fontSize: 15,
    top: 70,
    fontWeight: "600",
    alignSelf: "center",
  },

  verticleDiv: {
    position: "absolute",
    top: 140,
    left: 190,
    height: 120,
  },

  inputs: {
    position: "absolute",
    top: 140,
  },
  userProfileImages: {
    position: "absolute",

    borderColor: "#5C5C5C",
    borderWidth: 0.2,
  },

  profileImage: {
    position: "absolute",
    left: 50,
    width: 105,
    height: 105,
    resizeMode: "contain",
    top: 150,
    borderRadius: 200,
    borderColor: "#5C5C5C",
    borderWidth: 0.2,
  },

  profileImageText: {
    position: "absolute",
    top: 356,
    fontSize: 13,
    color: "#A1A1B3",
    left: 45,
  },

  profileBannerText: {
    position: "absolute",
    top: 356,
    fontSize: 13,
    color: "#A1A1B3",
    left: 240,
  },

  backButton: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 30,
    top: 70,
  },

  userBanner: {
    position: "absolute",
    top: 130,
    width: 130,
    height: 130,
    left: 240,
    borderRadius: 10,
    borderColor: "#5C5C5C",
    borderWidth: 0.2,
  },
  username: {
    position: "absolute",
    top: 300,
    left: 55,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  displayName: {
    top: 370,
    left: 55,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },

  bio: {
    top: 385,
    left: 55,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 60,
    paddingLeft: 30,
  },
});
