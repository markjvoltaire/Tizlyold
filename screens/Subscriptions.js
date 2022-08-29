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
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getLikes, getAllUsers } from "../services/user";
import { supabase } from "../services/supabase";
import HomeFeedList from "../components/home/HomeFeedList";
import { StackActions } from "@react-navigation/native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import AnimatedBottomSheet from "../components/home/AnimatedBottomSheet";
import Explore from "./Explore";

export default function Subscriptions({ navigation }) {
  const [users, setUsers] = useState();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const pushAction = StackActions.replace("Explore");

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

  if (input === true) {
    <Explore />;
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

  const searchDropdown = () => {
    return (
      <View>
        <Text>YOoOOOOOO</Text>
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileDetail", {
              username: item.username,
              displayName: item.displayName,
              profileimage: item.profileimage,
              bannerImage: item.bannerImage,
              bio: item.bio,
              id: item.id,
              user_id: item.user_id,
            })
          }
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 124, height: 130, borderRadius: 13 }}
              source={{ uri: item.profileimage }}
            />
            <Image
              style={{
                width: 124,
                height: 93,
                top: 37,
                borderRadius: 13,
                position: "absolute",
              }}
              source={require("../assets/fader.png")}
            />
            <Text>{item.displayName}</Text>
            <Text>@{item.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c" }} />
    );
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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Still Looking?"
        autoCapitalize="none"
        onChangeText={(text) => searchFilter(text)}
        value={search}
        onFocus={() => setInput(true)}
        onBlur={() => setInput(false)}
        onPressIn={() => {
          top.value = withSpring(dimensions.height / 1.48, SPING_CONFIG);
        }}
      />
      <Image
        style={styles.searchIcon}
        source={require("../assets/Search.png")}
      />

      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
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
  searchInput: {
    top: 15,
    alignSelf: "center",
    paddingLeft: 63,
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: "#F3F3F9",
    width: 300,
    height: 45,
  },
  searchIcon: {
    height: 20,
    width: 20,
    bottom: 20,
    left: 80,
  },
});
