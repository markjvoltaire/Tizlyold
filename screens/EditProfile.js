import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";

export default function EditProfile({ navigation }) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <TextInput placeholder="Username" style={styles.username} />
      <TextInput placeholder="Display Name" style={styles.displayName} />
      <TextInput placeholder="Email" style={styles.email} />
      <TextInput placeholder="Password" style={styles.password} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    top: 40,
    left: 30,
  },
  username: {
    position: "absolute",
    top: 300,
    left: 55,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  displayName: {
    top: 380,
    left: 55,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  email: {
    top: 430,
    left: 55,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
  password: {
    top: 480,
    left: 55,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    width: 311,
    height: 50,
    paddingLeft: 30,
  },
});
