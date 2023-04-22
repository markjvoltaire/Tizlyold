import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  Appearance,
  Dimensions,
} from "react-native";

import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import SearchView from "../components/explore/SeacrhView";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";

export default function ExploreScreen({ navigation }) {
  const { user, setUser } = useUser();

  const [query, setQuery] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });

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

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingBottom: height * 0.05 }}>
        <Header navigation={navigation} user={user} />
      </View>

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
      />

      {search === "" ? null : (
        <View style={{ position: "absolute", top: 130, left: 300 }}>
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text style={{ fontWeight: "800", color: "#73738B" }}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <Image
        style={{
          height: height * 0.02,
          width: width * 0.026,
          left: width * 0.18,
          bottom: height * 0.019,
          aspectRatio: 1,
        }}
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
