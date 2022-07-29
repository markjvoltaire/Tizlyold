import express from "express";
import Stripe from "stripe";
import cors from "cors";
import { supabase } from "../services/supabase";

const STRIPE_WEBHOOK_SECRET =
  "whsec_4e5c9ca7d161896f6ad566a52507f767e107a881bf3d9ede7f45c4f4136242b6";

const PUBLISHABLE_KEY =
  "pk_test_51LPUTtCvtaY6dxcGIxHX3dtf4hLy3UDzy57Wbjm3zcELFJHoqFWoEaAwOVmieZgkCyoSwimcyqjTsypnfJATHNFJ00kjY5AbSg";

const SECRET_KEY =
  "sk_test_51LPUTtCvtaY6dxcG2HlkrXV007ntkbTPHVbmoLzk2U3EXCFF36bcQkniR92HfFYyHbEpwUQ6KUQxxhl7Wu1GPFM200U3wo7LwX";

const app = express();
const port = 5000;

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});

app.post("/pay", async (req, res) => {
  try {
    const { username, email, userid, sellerUserId, buyerUserId } = req.body;
    if (!username)
      return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { username, userid, email, sellerUserId, buyerUserId },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/stripe", async (req, res) => {
  const { sellerUserId } = req.body;
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.buyerUserId} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.buyerUserId} succeeded payment!`);

    // fulfilment
    async function addPaymentDetails() {
      // const userId = supabase.auth.currentUser.id;

      const resp = await supabase.from("subscriptions").insert([
        {
          customerid: event.data.object.metadata.buyerUserId,
          sellerid: event.data.object.metadata.sellerUserId,
          paymentComfirmation: event.data.object.id,
        },
      ]);

      console.log(resp);

      return resp;
    }
    addPaymentDetails();
  }

  res.json({ ok: true });
});

//event id evt_3LQbf8CvtaY6dxcG10ZvEzeV
//event id evt_3LQbfqCvtaY6dxcG16z8zqY1
