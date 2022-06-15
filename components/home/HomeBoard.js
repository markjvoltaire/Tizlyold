import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getUserEmail } from "../../services/user";
import { supabase } from "../../services/supabase";

export default function HomeBoard() {
  // bring this back when we can store the user name in context when logging in
  // const { user } = useUser();
  // console.log("user", user);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserEmail();
      setUserEmail(data);
    };
    fetchData();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome {userEmail}</Text>

      <TouchableOpacity>
        <Image
          style={styles.homeboard}
          source={require("../../assets/homeBanner.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 180,
  },
  header: {
    position: "absolute",
    top: -300,
    color: "black",
    width: 500,
    left: -160,
    fontWeight: "bold",
  },

  homeboard: {
    position: "absolute",
    top: -260,
    left: -188,
    height: 200,
    width: 430,
  },
});
