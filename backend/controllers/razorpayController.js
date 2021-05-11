import asyncHandler from "express-async-handler";
import crypto from "crypto";
import Razorpay from "razorpay";
import shortid from "shortid";
import dotenv from "dotenv";

dotenv.config();

console.log("Rzp Controller called");
console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

let razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc     Create an order to get the orderId
// @route    POST /api/razorpay
// @access   Public
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const currency = "INR";
  const receipt = shortid.generate();
  const payment_capture = 1;
  const options = {
    amount: amount,
    currency,
    receipt,
    payment_capture,
  };
  const response = await razorpay.orders.create(options);
  res.json(response);
});

// @desc     Verify the payment
// @route    GET /api/razorpay/verification
// @access   Public
const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentId, signature } = req.query;

  const digest = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

  if (digest === signature) {
    res.json({ success: true, message: "" });
  } else {
    res.json({
      success: false,
      message: "Something went wrong. Try the payment again after a while.",
    });
  }
});

export { createRazorpayOrder, verifyRazorpayPayment };
