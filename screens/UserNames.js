import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { supabase } from "../services/supabase";
import { addUser } from "../services/user";

export default function UserNames({ navigation }) {
  const [query, setQuery] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const allUsernames = filterData.map((i) => i.username);
  console.log("allUsernames", allUsernames);

  console.log("username", username);

  if (username === allUsernames.map((i) => i.username)) {
    console.log("MATCH");
  }

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  const fetchUsers = async () => {
    const resp = await supabase
      .from("profiles")
      .select("*")
      .order("id", { ascending: false });
    setFilterData(resp.body);

    setMasterData(resp.body);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.username
          ? item.username.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  const SPING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  };
  const dimensions = useWindowDimensions();

  const top = useSharedValue(dimensions.height);

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPING_CONFIG),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },

    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },

    onEnd() {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height;
      } else {
        top.value = dimensions.height / 2;
      }
    },
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image style={styles.logoBg} source={require("../assets/bg.png")} />

      <Image
        style={styles.headerIcon}
        source={require("../assets/Tizlymed.png")}
      />

      <TouchableOpacity onPress={() => navigation.navigate("ProfileImage")}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <Text style={styles.helpline}>Please Enter your username</Text>

      <TextInput
        style={styles.usernameInput}
        placeholder="Username"
        autoCapitalize="none"
        autoFocus={true}
        onChangeText={(text) => setUsername(text) && setQuery(text)}
        value={username}
      />

      <TextInput
        style={styles.displayNameInput}
        placeholder="Display Name"
        autoCapitalize="none"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />

      <TouchableOpacity
        onPress={() =>
          addUser(username, displayName).then(() => {
            navigation.navigate("HomeScreen");
          })
        }
      >
        <Image
          style={styles.continueButton}
          source={require("../assets/buttonBlue.png")}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    left: 41,
    top: 90,
  },

  usernameInput: {
    position: "absolute",
    left: 55,
    top: 350,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },

  headerIcon: {
    position: "absolute",
    width: 100,
    height: 100,
    left: 168,
    top: 180,
    resizeMode: "contain",
  },
  continueButton: {
    position: "absolute",
    width: 311,
    height: 50,
    top: 490,
    left: 55,
  },
  userPic: {
    resizeMode: "contain",
    width: 128,
    height: 90,
    top: 130,
    left: 145,
  },
  logoBg: {
    position: "absolute",
    width: 538,
    height: 389,
    top: -70,
  },
  helpline: {
    position: "absolute",
    top: 300,
    left: 120,
    opacity: 0.6,
  },
  displayNameInput: {
    position: "absolute",
    left: 55,
    top: 415,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
});
