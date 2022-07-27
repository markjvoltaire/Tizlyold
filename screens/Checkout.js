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

export default function Checkout({ navigation }) {
  const [name, setName] = useState();
  const [cardDetails, setCardDetails] = useState();
  const stripe = useStripe();

  const subscribe = async () => {
    try {
      // sending request
      const response = await fetch("http://localhost:5000/pay", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton2.png")}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      {/* <CardField
        postalCodeEnabled={true}
        placeholder="4242 4242 4242 4242"
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      /> */}

      <Button title="Pay" onPress={subscribe} />
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
  cardContainer: {
    width: "90%",
    height: 50,
    marginVertical: 30,
  },
});

// const { confirmPayment, loading } = useConfirmPayment();

// const API_URL = "http://localhost:5000";

// const fetchPaymentIntentClientSecret = async () => {
//   const response = await fetch(`192.168.1.65/create-payment-intent`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const { clientSecret, error } = await response.json();
//   return { clientSecret, error };
// };

// const handlePayPress = async () => {
//   if (!cardDetails?.complete || !email) {
//     Alert.alert("Please enter complete card details and email");

//     return;
//   }
//   const billingDetails = {
//     email: email,
//   };

//   try {
//     const { clientSecret, error } = await fetchPaymentIntentClientSecret();
//     if (error) {
//       console.log("Unable to process payment");
//     } else {
//       const { paymentIntent, error } = await confirmPayment(clientSecret, {
//         type: "Card",
//         billingDetails: billingDetails,
//       });
//       if (error) {
//         alert(`Payment Confirmation Error ${error.message}`);
//       } else if (paymentIntent) {
//         alert("PAyment Successful");
//         console.log("Payment successful", paymentIntent);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
