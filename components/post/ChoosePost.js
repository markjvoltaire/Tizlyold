import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ChoosePost({ navigation }) {
  const [image, setImage] = useState();
  const pickPost = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("photo", photo);

    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      setImage(photo);
      navigation.navigate("Checkout", { image: image });

      return photo;
    }
  };

  return (
    <View>
      <Button title="button" onPress={() => pickPost()} />
    </View>
  );
}

const styles = StyleSheet.create({});
