import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  CardField,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";

export default function Checkout({ navigation, route }) {
  const [name, setName] = useState();
  const [cardDetails, setCardDetails] = useState();

  console.log("route", route);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton2.png")}
        />
        <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: route.params.image.uri }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    width: 350,
    padding: 10,
  },
  card: {
    backgroundColor: "#EFEFEFEF",
  },
});
