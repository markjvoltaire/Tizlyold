import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchView from "./SearchView";
import { supabase } from "../../services/supabase";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import HomeBoard from "../home/HomeBoard";
import TrendingCreators from "./TrendingCreators";
import NewToTizly from "./NewToTizly";
import SearchList from "./SearchList";

export default function SearchBar({ setIsPressed, isPressed, navigation }) {
  const [query, setQuery] = useState("");
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

  console.log("search", search);

  if (input === true) {
    <View>
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
        source={require("../../assets/Search.png")}
      />

      <FlatList
        style={{ marginBottom: 100 }}
        numColumns={2}
        data={filterData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "red" }} />
        )}
        renderItem={({ item }) => (
          <SearchList
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            navigation={navigation}
            item={item}
            query={query}
          />
        )}
      />

      <SearchView
        isPressed={isPressed}
        navigation={navigation}
        setIsPressed={setIsPressed}
        search={search}
        input={input}
        filterData={filterData}
      />
    </View>;
  }

  if (search === "") {
    return (
      <ScrollView>
        <View>
          <HomeBoard />
        </View>
        <View>
          <TrendingCreators navigation={navigation} />
        </View>
        <View>
          <NewToTizly navigation={navigation} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    top: 35,
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
