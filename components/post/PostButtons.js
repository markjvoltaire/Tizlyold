import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { supabase } from "../../services/supabase";

export default function PostButtons({ image }) {
  const uploadPostFromUri = async () => {
    const userId = supabase.auth.currentUser.id;

    const ext = image.uri.substring(photo.uri.lastIndexOf(".") + 1);

    const fileName = photo.uri.replace(/^.*[\\\/]/, "");

    var formData = new FormData();
    formData.append("files", {
      uri: photo.uri,
      name: fileName,
      type: image.type ? `image/${ext}` : `video/${ext}`,
    });

    const { data, error } = await supabase.storage
      .from("profile-images")
      .upload(fileName, formData, {
        upsert: false,
      });

    const { publicURL } = await supabase.storage
      .from("profile-images")
      .getPublicUrl(`${fileName}`);

    const resp = await supabase.from("profiles").insert({
      user_id: userId,
      title: title,
      description: description,
      username: username,
      DisplayName: displayName,
      profileImage: profileimage,
      bio: bio,
      media: publicURL,
    });

    getUserByIds();

    console.log("error", error);

    if (error) throw new Error(error.message);

    return { ...image, imageData: data };
  };

  return (
    <View>
      <TouchableOpacity
        // onPress={async () => {
        //   await uploadPostFromUri();
        // }}
        onPress={() => console.log(image)}
      >
        <Image
          style={styles.postButton}
          source={require("../../assets/post.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  likeButton: {
    position: "absolute",
  },
  postButton: {
    position: "absolute",
    width: 59,
    height: 32,
    left: 320,
    bottom: 326,
  },
});
