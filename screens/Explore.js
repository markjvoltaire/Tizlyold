import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/explore/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";
import MainStackNavigator from "../navigation/StackNavigator";
import { getUsername, getUsers } from "../services/user";
import TopHeader from "../components/TopHeader";
import NewToTizly from "../components/explore/NewToTizly";
import Search from "../components/explore/Search";
import { Dimensions } from "react-native";
import UserButtons from "../components/home/UserButtons";
import SearchBar from "../components/explore/SearchBar";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { supabase } from "../services/supabase";
import SearchView from "../components/explore/SearchView";
import { useUser } from "../context/UserContext";
import Points from "../views/Points";

export default function Explore({ navigation }) {
  const { user, setUser } = useUser();

  const [query, setQuery] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);

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
    <View style={styles.container}>
      <Points navigation={navigation} />

      <TextInput
        style={styles.searchInput}
        placeholder="Still Looking?"
        autoCapitalize="none"
        onChangeText={(text) => searchFilter(text) && setQuery(text)}
        value={search}
        onFocus={() => {
          setInput(true) && setIsPressed(true);
        }}
        onBlur={() => setInput(false) && setIsPressed(false)}
        onPressIn={() => {
          top.value = withSpring(dimensions.height / 1.48, SPING_CONFIG);
        }}
      />
      <Image
        style={styles.searchIcon}
        source={require("../assets/Search.png")}
      />

      <SearchView
        search={search}
        input={input}
        navigation={navigation}
        filterData={filterData}
        isPressed={isPressed}
        setIsPressed={setIsPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 306.5,
    width: 29,
    height: 29,
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
  },
  halfSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.5,
    width: 298,
    left: 70,
    bottom: 25,
  },
  halfSeperator2: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.5,
    width: 298,
    left: 70,
    top: 235,
  },
  homeBoardContainer: {
    backgroundColor: "white",
  },
  explorePageContainer: {
    flex: 1,
  },
});
