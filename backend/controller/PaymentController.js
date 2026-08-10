import axios from 'axios';
import Donation from "../models/PaymentModel.js";
import { configDotenv } from 'dotenv';
// 1. Initialize Payment
export const initializeDonation = async (req, res) => {
  try {
    console.log(req.body.donorlName);
    const {   donorfName,donorlName,email,amount } = req.body;
    console.log(process.env.TEST_PAYSTACK_SECRET_KEY);
    

    if (!email || !amount || !donorfName || !donorlName) {
      return res.status(400).json({ error: "Email, amount, and donorName are required." });
    }

    // Convert amount to Kobo/Cents (Paystack calculates in lowest currency unit: 1 NGN = 100 Kobo)
    const amountInKobo = Math.round(Number(amount) * 100);

    // Call Paystack API
    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amountInKobo,
        metadata: {  donorfName,donorlName },
       // callback_url: `${process.env.FRONTEND_URL}/donation/verify`, // React redirect page
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { authorization_url, reference } = paystackResponse.data.data;

    // Save pending record to MongoDB
    await Donation.create({
       donorfName,
      donorlName,
      email,
      amount: Number(amount),
      reference,
      status: 'pending',
    });

    // Send redirect URL back to React frontend
    res.status(200).json({ authorization_url, reference });

  } catch (error) {
    console.error("Paystack Init Error:", error.response?.data || error.message);
    console.log(error);
    
    res.status(500).json({ error: error.response?.data?.message || "Payment initialization failed." });
  }
};

// 2. Verify Payment
export const verifyDonation = async (req, res) => {
  try {
    const { reference } = req.params;

    // DEBUG LOGS
    console.log("Extracted Reference:", reference);
    console.log("Secret Key Loaded:", process.env.TEST_PAYSTACK_SECRET_KEY ? "YES" : "NO - KEY IS UNDEFINED");

    if (!reference) {
      return res.status(400).json({ error: "Transaction reference is required." });
    }

    // Call Paystack to verify status directly with their servers
    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
          "Content-Type":"application/json"
        },
      }
    );

    const { status, amount, customer, metadata } = paystackResponse.data.data;

    if (status === 'success') {
      // Find pending donation record and update status
      const updatedDonation = await Donation.findOneAndUpdate(
        { reference },
        { status: 'success' },
        { new: true }
      );

      return res.status(200).json({
        message: "Payment verified successfully!",
        donation: updatedDonation,
      });
    } else {
      await Donation.findOneAndUpdate({ reference }, { status: 'failed' });
      return res.status(400).json({ error: "Payment verification failed or was abandoned." });
    }

  } catch (error) {
    console.error("Paystack Verify Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error verifying donation status." });
  }
};