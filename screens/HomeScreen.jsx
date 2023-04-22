import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  useColorScheme,
  Animated,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";
import { creatorsYouMayLike } from "../services/user";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();
  const [creators, setCreators] = useState();
  const { userAuth, setUserAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [creatorLoading, setCreatorLoading] = useState(true);
  const [profileModal, setProfileModal] = useState(true);
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const scheme = useColorScheme();

  const themeTextStyle = scheme === "light" ? "black" : "white";
  async function signOutUser() {
    await supabase.auth.signOut();
    setUserAuth();
  }

  const defaultImageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  /// CALLING FOR CURRENT USERS DATA FROM SUPABASE ///
  async function getCurrentUser() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(resp.body);

    return resp;
  }

  useEffect(() => {
    const getUser = async () => {
      await getCurrentUser();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    getUser();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const resp = await creatorsYouMayLike();

      setCreators(resp);
      setCreatorLoading(false);
    };
    getUsers();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <Text
          style={{ color: "white", alignSelf: "center", top: height * 0.2 }}
        >
          IM LOADING
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Header user={user} />
      {creatorLoading === true ? (
        <Text
          style={{ color: "white", alignSelf: "center", top: height * 0.2 }}
        >
          IM LOADING
        </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              alignSelf: "center",
              top: height * 0.02,
              fontWeight: "600",
              fontSize: 20,
              color: themeTextStyle,
            }}
          >
            Creators You May Like
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              top: height * 0.08,
              marginBottom: height * 0.2,
            }}
          >
            {creators.map((item) => {
              return (
                <>
                  <View
                    style={{ paddingBottom: 30, marginTop: 10 }}
                    key={item.id}
                  >
                    <TouchableOpacity onPress={() => setProfileModal(true)}>
                      <Animated.Image
                        style={{
                          height: 170,
                          width: 170,
                          margin: width * 0.01,
                          borderRadius: 13,
                          borderWidth: 0.2,
                          resizeMode: "contain",
                          opacity: defaultImageAnimated,
                        }}
                        source={{ uri: item.profileimage }}
                        onLoad={handleDefaultImageLoad}
                      />

                      <Image
                        style={{
                          height: 170,
                          width: 170,
                          margin: width * 0.01,
                          borderRadius: 13,
                          position: "absolute",
                          borderWidth: 0.6,
                          borderColor: "#5C5C5C",
                        }}
                        source={require("../assets/fade1.png")}
                      />

                      <Text
                        style={{
                          position: "absolute",
                          top: height * 0.155,
                          color: "white",
                          fontWeight: "800",
                          fontSize: 10.5,
                          left: width * 0.02,
                        }}
                      >
                        {item.displayName}
                      </Text>
                      <Text
                        style={{
                          position: "absolute",

                          color: "#D7D8DA",
                          fontWeight: "500",
                          left: width * 0.02,
                          fontSize: 10.5,
                          top: height * 0.17,
                        }}
                      >
                        @{item.username}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
