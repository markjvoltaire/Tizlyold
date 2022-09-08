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
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function EditProfile({ navigation }) {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bannerType, setBannerType] = useState();
  const [bannerData, setBannerData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState(user.username);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);

  const bannerImageType = user.bannerImageType;

  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
      setLoading(false);
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

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const uploadProfileFromUri = async (photo) => {
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

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  const uploadBannerFromUri = async (photo) => {
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

      let imageLink = publicURL;
      let type = photo.type;

      console.log("type ", type);

      setBannerType(type);

      const resp = await supabase
        .from("profiles")
        .update({ bannerImage: publicURL, bannerImageType: type })

        .eq("user_id", userId);

      // getUserByIds();

      console.log("error", error);

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  if (user === undefined) {
    navigation.navigate("Username");
  }

  if (user.bannerImage === undefined) {
    navigation.navigate("Username");
  }

  const pickProfileImage = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      console.log(photo);
      return await uploadProfileFromUri(photo);
    } catch (e) {
      ErrorAlert({ title: "image upload", message: e.message });
      return null;
    }
  };

  const pickBannerImage = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      console.log(photo);
      return await uploadBannerFromUri(photo);
    } catch (e) {
      ErrorAlert({ title: "image upload", message: e.message });
      return null;
    }
  };

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

  const pushActionProfile = StackActions.replace("UserProfile");

  async function editProfile() {
    const userId = supabase.auth.currentUser.id;

    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username, displayName: displayName, bio: bio })
      .eq("user_id", userId);

    if (!error) {
      navigation.goBack();
    }
    if (
      error.message ===
      'duplicate key value violates unique constraint "profiles_username_key"'
    ) {
      Alert.alert("This Username Is Already Taken");
    }
  }

  async function editProfile() {
    const userId = supabase.auth.currentUser.id;

    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username, displayName: displayName, bio: bio })
      .eq("user_id", userId);

    const editProfileImage = async () => {
      const userId = supabase.auth.currentUser.id;

      const resp = await supabase
        .from("comments")
        .update({ userProfileImage: image })
        .eq("userId", userId);
    };

    const editLikeProfileImage = async () => {
      const userId = supabase.auth.currentUser.id;

      const resp = await supabase
        .from("likes")
        .update({ userProfileImage: image })
        .eq("userId", userId);
    };

    const editSaveProfileImage = async () => {
      const userId = supabase.auth.currentUser.id;

      const resp = await supabase
        .from("saves")
        .update({ userProfileImage: image })
        .eq("userId", userId);
    };

    editProfileImage();
    editLikeProfileImage();
    editSaveProfileImage();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={styles.pageTitle}>Edit Profile</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <Image style={styles.logo} source={require("../assets/TizlyBig.png")} />

      <View style={styles.imagesAndInputs}>
        <Text style={styles.profileImageText}>Change Profile Image</Text>

        <Text style={styles.profileBannerText}>Change Profile Banner</Text>

        <Image
          style={styles.verticleDiv}
          source={require("../assets/verticleDiv.png")}
        />

        <View style={styles.inputs}>
          <TextInput
            placeholder="Username"
            style={styles.username}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Display Name"
            style={styles.displayName}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
          />

          <TextInput
            placeholder="Bio"
            style={styles.bio}
            value={bio}
            onChangeText={(text) => setBio(text)}
          />
        </View>
      </View>

      <View style={styles.userProfileImages}>
        <TouchableOpacity
          onPress={async () => {
            const resp = await pickProfileImage();

            if (resp?.imageData) {
              setImage(resp.uri);
              setImageData(resp?.imageData);
            }
          }}
        >
          <Image
            style={styles.profileImage}
            source={
              user.profileimage === null
                ? require("../assets/noProfilePic.jpeg")
                : { uri: user.profileimage }
            }
          />
          <Image
            style={styles.bluePlusProfile}
            source={require("../assets/bluePlus.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            const resp = await pickBannerImage();

            if (resp?.imageData) {
              setBanner(resp.uri);
              setBannerData(resp?.imageData);
            }
          }}
        >
          {user.bannerImageType === "image" ? (
            <Image
              style={styles.userBanner}
              source={
                user.bannerImage === null
                  ? require("../assets/noProfilePic.jpeg")
                  : { uri: user.bannerImage }
              }
            />
          ) : (
            <Video
              source={{ uri: user.bannerImage }}
              isLooping
              shouldPlay={true}
              isMuted={true}
              resizeMode="cover"
              style={styles.userBanner}
            />
          )}
          <Image
            style={styles.bluePlusBanner}
            source={require("../assets/bluePlus.png")}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => editProfile()}>
        <Image
          style={styles.button}
          source={require("../assets/continueButton.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 311,
    height: 50,
    left: 52,
    top: 750,
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
    width: 80,
    top: 60,
    left: 170,
  },

  pageTitle: {
    position: "absolute",
    fontSize: 25,
    top: 140,
    left: 30,
  },

  verticleDiv: {
    position: "absolute",
    top: 200,
    left: 190,
    height: 120,
  },

  inputs: {
    position: "absolute",
    top: 140,
  },
  userProfileImages: {
    position: "absolute",
    top: 60,
  },

  profileImage: {
    position: "absolute",
    left: 50,
    width: 105,
    height: 105,
    resizeMode: "contain",
    top: 150,
    borderRadius: 200,
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
    top: 20,
  },

  userBanner: {
    position: "absolute",
    top: 130,
    width: 130,
    height: 130,
    left: 240,
    borderRadius: 10,
  },
  username: {
    position: "absolute",
    top: 300,
    left: 55,
    borderRadius: 25,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  displayName: {
    top: 380,
    left: 55,
    borderRadius: 25,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },

  bio: {
    top: 410,
    left: 55,
    borderRadius: 25,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 100,
    paddingLeft: 30,
  },
});
