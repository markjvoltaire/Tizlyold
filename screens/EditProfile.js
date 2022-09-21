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
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditProfile({ navigation }) {
  const [bannerType, setBannerType] = useState();
  const [bannerData, setBannerData] = useState({});
  const [imageData, setImageData] = useState({});
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const video = React.useRef(null);
  const [image, setImage] = useState(user.profileimage);
  const [banner, setBanner] = useState(user.bannerImage);
  const [username, setUsername] = useState(user.username);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);

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
      aspect: [4, 3],
      quality: 0,
    });

    if (!photo.cancelled) {
      setImage(photo.uri);
      setImageData(photo);
    }
  };

  const pickBannerImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      videoMaxDuration: 10,
      aspect: [4, 3],
      quality: 0,
    });

    if (!photo.cancelled) {
      setBanner(photo.uri);
      setBannerData(photo);
      setBannerType(photo.type);
    }
  };
  // try {
  //   return await uploadBannerFromUri(photo);
  // } catch (e) {
  //   Alert.alert({ title: "image upload", message: e.message });
  //   return null;
  // }

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

    const uploadBannerFromUri = async () => {
      const userId = supabase.auth.currentUser.id;
      const ext = banner.substring(banner.lastIndexOf(".") + 1);
      const fileName = banner.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: banner,
        name: fileName,
        type: bannerData.type ? `image/${ext}` : `video/${ext}`,
      });

      try {
        const { data, error } = await supabase.storage
          .from("profile-images")
          .upload(fileName, formData, {
            upsert: false,
          });

        const { publicURL } = await supabase.storage
          .from("profile-images")
          .getPublicUrl(`${fileName}`);

        let imageLink = publicURL;
        let type = bannerData.type;

        setBannerType(type);

        const resp = await supabase
          .from("profiles")
          .update({ bannerImage: publicURL, bannerImageType: type })

          .eq("user_id", userId);
      } catch (e) {
        return null;
      }

      if (error) {
        Alert.alert(error.message);
      }

      return { ...banner, imageData: data };
    };

    const uploadProfileImageFromUri = async () => {
      const userId = supabase.auth.currentUser.id;
      const ext = image.substring(banner.lastIndexOf(".") + 1);
      const fileName = image.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: image,
        name: fileName,
        type: imageData.type ? `image/${ext}` : `video/${ext}`,
      });

      try {
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
      } catch (e) {
        return null;
      }

      if (imageData.type === null) {
        return null;
      }

      if (error === null) {
        return undefined;
      } else {
        Alert.alert(error.message);
      }

      console.log("data", data);

      return { ...image, imageData: data };
    };

    uploadBannerFromUri();
    uploadProfileImageFromUri();
    editProfileImage();
    editLikeProfileImage();
    editSaveProfileImage();
    sendAlert();

    if (
      error.message ===
      'duplicate key value violates unique constraint "profiles_username_key"'
    ) {
      Alert.alert("This Username Is Already Taken");
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
            style={styles.profileImage}
            source={
              image === null
                ? require("../assets/noProfilePic.jpeg")
                : { uri: image }
            }
          />
          <Image
            style={styles.bluePlusProfile}
            source={require("../assets/bluePlus.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pickBannerImage()}>
          {banner.endsWith(".mov") ? (
            <Video
              ref={video}
              source={{ uri: banner }}
              isLooping
              shouldPlay={true}
              isMuted={true}
              resizeMode="cover"
              style={styles.userBanner}
            />
          ) : (
            <Image
              style={styles.userBanner}
              source={
                user.bannerImage === null
                  ? require("../assets/noProfilePic.jpeg")
                  : { uri: banner }
              }
            />
          )}
          <Image
            style={styles.bluePlusBanner}
            source={require("../assets/bluePlus.png")}
          />
        </TouchableOpacity>
      </View>

      <Image
        style={styles.verticleDiv}
        source={require("../assets/verticleDiv.png")}
      />

      <TextInput
        placeholder="Username"
        style={styles.username}
        value={username}
        onChangeText={(text) => setUsername(text.toLowerCase())}
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
      <TouchableOpacity onPress={() => editProfile()}>
        <Image
          style={styles.button}
          source={require("../assets/continueButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

// <SafeAreaView
//   style={{
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   }}
// >
//   <KeyboardAvoidingView
//     style={styles.container}
//     behavior={Platform.OS === "ios" ? "padding" : "height"}
//   >

//     <View style={styles.imagesAndInputs}>

//       <View style={styles.inputs}>
//         <TextInput
//           placeholder="Username"
//           style={styles.username}
//           value={username}
//           onChangeText={(text) => setUsername(text.toLowerCase())}
//         />
//         <TextInput
//           placeholder="Display Name"
//           style={styles.displayName}
//           value={displayName}
//           onChangeText={(text) => setDisplayName(text)}
//         />

//         <TextInput
//           placeholder="Bio"
//           style={styles.bio}
//           value={bio}
//           onChangeText={(text) => setBio(text)}
//         />
//       </View>
//     </View>

//   </KeyboardAvoidingView>
// </SafeAreaView>

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
    fontSize: 16,
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
