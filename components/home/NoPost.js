import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

export default function NoPost() {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FullSeperator />
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          style={styles.settingIcon}
          source={require("../../assets/Setting.jpg")}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.pageHeader}>Don't See Any Content ?</Text>
      </View>

      <View style={styles.whyHeader}>
        <Text style={styles.why}>Why?</Text>
      </View>
      <View style={styles.whyDiv}>
        <Text style={styles.whyText}>
          Your home feed shows you content of creators that you are subscribed
          to.
        </Text>
      </View>

      <View style={styles.howHeader}>
        <Text style={styles.how}>How?</Text>
      </View>

      <View style={styles.howDiv}>
        <Text style={styles.howText}>
          Use the search button above to find your favorite creator or you can
          visit the explore screen to discover your new favorite creator.
        </Text>
      </View>

      <View style={styles.exploreButtonDiv}>
        <TouchableOpacity onPress={() => navigation.navigate("ExploreScreen")}>
          <Image
            style={styles.exploreButton}
            source={require("../../assets/exploreCreators.png")}
          />
        </TouchableOpacity>
      </View>

      <Image
        style={styles.whyIcon}
        source={require("../../assets/bottomtab/SubscribersLight.jpg")}
      />
      <Image
        style={styles.howIcon}
        source={require("../../assets/Search.png")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  whyHeader: {
    position: "absolute",
    left: 88,
    top: 321,
  },

  howHeader: {
    position: "absolute",
    left: 88,
    top: 500,
  },

  why: {
    fontWeight: "800",
    color: "#4A90E2",
    fontSize: 20,
  },
  how: {
    fontWeight: "800",
    color: "#4A90E2",
    fontSize: 20,
  },

  whyDiv: {
    position: "absolute",
    color: "#686877",
    fontWeight: "500",
    width: 252,
    left: 88,
    top: 360,
  },
  howDiv: {
    position: "absolute",
    color: "#686877",
    fontWeight: "500",
    width: 252,
    left: 88,
    top: 540,
  },
  whyIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    bottom: 425,
    left: 40,
  },
  howIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    left: 40,
    bottom: 230,
  },

  whyText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
  },

  howText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
  },

  pageHeader: {
    position: "absolute",
    fontWeight: "800",
    fontSize: 20,
  },
});
