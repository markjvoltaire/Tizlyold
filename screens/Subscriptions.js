import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import {getLikes} from "../services/user"
import { supabase } from "../services/supabase";
import HomeFeedList from "../components/home/HomeFeedList";


export default function Subscriptions({ navigation }) {
  const [likes, setLikes] = useState()
  const [isPressed, setIsPressed] = useState(false)
  
  const handlePress = () => {
    setIsPressed(current => !current)
    console.log('isPressed', isPressed)
  }




  return (
    <SafeAreaView style={styles.container}>
   <Button onPress={() => handlePress()} title="press me"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "white",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
