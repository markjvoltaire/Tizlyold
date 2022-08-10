import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import TopHeader from "../TopHeader";

export default function NoPost({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ bottom: 350 }}>
        <TopHeader />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    bottom: 300,
  },
  whyHeader: {
    position: "absolute",
    left: 88,
    top: 221,
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
    bottom: 100,
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
    top: 440,
  },
  whyIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    bottom: 525,
    left: 40,
  },
  howIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    left: 40,
    bottom: 330,
  },

  whyText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
    bottom: 100,
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

  profileimage: {
    width: 100,
  },
  exploreButton: {
    position: "absolute",
    width: 213,
    height: 40,
    bottom: 30,
  },

  exploreButtonDiv: {
    right: 105,
    alignItems: "center",
    top: 300,
  },

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
  },
  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 270.7,
    width: 29,
    height: 29,
  },
  image: {
    width: 900,
    height: 900,
  },
  userBanner: {
    position: "absolute",
    width: 455,
    right: -10,
    height: 455,
  },
});
