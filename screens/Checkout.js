import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { supabase } from "../services/supabase";

export default function Checkout({ navigation }) {
  const [image, setImage] = useState();
  const [uploadProgress, setUploadProgress] = useState("");
  const [response, setResponse] = useState("Response Should Be Here");
  const [post, setPost] = useState();
  const [mediaType, setMediaType] = useState("text");

  const pickPost = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      try {
        const handleProgress = (e) => {
          setUploadProgress(Math.round(e.loaded / e.total));
          console.log("uploadProgress", uploadProgress);
        };

        const { data, error } = await supabase.storage
          .from("posts")
          .upload(fileName, formData, {
            upsert: true,
          });

        const { publicURL } = await supabase.storage

          .from("posts")
          .getPublicUrl(`${fileName}`);

        let imageLink = publicURL;
        const url = `${supabase.supabaseUrl}/storage/v1/object/posts/${data.Key}`;
        const headers = supabase._getAuthHeaders();

        const req = new XMLHttpRequest();

        function updateProgress(event) {
          console.log("LOADING");
          setUploadProgress("LOADING");
        }

        function loadEnd(e) {
          setUploadProgress(
            "The transfer finished (although we don't know if it succeeded or not)."
          );
        }

        function transferComplete(evt) {
          setUploadProgress("The transfer is complete.");
          setPost(imageLink);
          console.log("DONE LOADING");
        }

        req.addEventListener("progress", updateProgress);

        req.addEventListener("load", transferComplete);
        // You might want to also listen to onabort, onerror, ontimeout

        req.open("POST", url);
        for (const [key, value] of Object.entries(headers)) {
          req.setRequestHeader(key, value);
        }
        req.setRequestHeader("Authorization", data.authorization);

        req.send(data);
        setPost(imageLink);

        let type = photo.type;

        setImage(imageLink);
        type = null ? setMediaType("text") : setMediaType(type);

        console.log("image", imageLink);
      } catch (e) {
        console.log({ title: "image upload", message: e.message });
        return null;
      }
    }
  };

  // Typescript will give errors for accessing protected members of supabase

  // const req = new XMLHttpRequest();
  // req.upload.onprogress = updateProgress;
  // req.upload.onload = transferComplete;
  // // You might want to also listen to onabort, onerror, ontimeout
  // req.open("POST", url);
  // for (const [key, value] of Object.entries(headers)) {
  //   req.setRequestHeader(key, value);
  // }
  // req.send(data);

  // function updateProgress(e) {
  //   const pct = (e.loaded / e.total) * 100;
  //   console.log(`Upload progress = ${e.loaded} / ${e.total} = ${pct}`);
  // }

  // function transferComplete(e) {
  //   console.log("The transfer is complete.");
  // }

  return (
    <SafeAreaView>
      <View style={{ top: 150 }}>
        <Image style={{ height: 200, width: 200 }} source={{ uri: image }} />
        <Button onPress={() => pickPost()} title="Upload Image" />
        <Text style={{ alignSelf: "center" }}>{uploadProgress}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
