import express from "express";
import Stripe from "stripe";
import cors from "cors";

const PUBLISHABLE_KEY =
  "pk_test_51LPUTtCvtaY6dxcGIxHX3dtf4hLy3UDzy57Wbjm3zcELFJHoqFWoEaAwOVmieZgkCyoSwimcyqjTsypnfJATHNFJ00kjY5AbSg";

const SECRET_KEY =
  "sk_test_51LPUTtCvtaY6dxcG2HlkrXV007ntkbTPHVbmoLzk2U3EXCFF36bcQkniR92HfFYyHbEpwUQ6KUQxxhl7Wu1GPFM200U3wo7LwX";

const app = express();
const port = 5000;

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});

app.post("/pay", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
