import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Permissions, Contacts } from "expo-permissions";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function UserProfileSubscribers({ navigation }) {
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
   
  };

  return (
    <SafeAreaView>
      <Text>UserProfileSubscribers</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Image Upload" onPress={openImagePickerAsync} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
