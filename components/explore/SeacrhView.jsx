import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import HomeBoard from "../explore/HomeBoard";
import TrendingCreators from "./TrendingCreators";
import NewToTizly from "./NewToTizly";
import SearchList from "./SearchList";

export default function SearchView({
  navigation,
  search,
  input,
  filterData,
  isPressed,
  setIsPressed,
}) {
  if (search === "") {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <HomeBoard navigation={navigation} />
        </View>
        <View style={{ bottom: 20 }}>
          <TrendingCreators navigation={navigation} />

          <NewToTizly navigation={navigation} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ paddingBottom: 100 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 25,
            top: 40,
            alignSelf: "center",
          }}
        >
          Results
        </Text>
        <FlatList
          style={{
            marginBottom: 100,
            alignSelf: "center",
            top: 60,
          }}
          numColumns={3}
          data={filterData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View />}
          renderItem={({ item }) => (
            <SearchList
              isPressed={isPressed}
              setIsPressed={setIsPressed}
              navigation={navigation}
              item={item}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
