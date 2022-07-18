import { View, Text } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function AddPost() {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      console.log("lolo", photo);
      setImage(photo.uri);
      return photo;
    } catch (e) {
      ErrorAlert({ title: "image upload", message: e.message });
      return null;
    }
  };

  return (
    <View>
      <TouchableOpacity>
        <Image
          style={styles.postButton}
          source={require("../../assets/post.png")}
        />
      </TouchableOpacity>
      <Post />
    </View>
  );
}
