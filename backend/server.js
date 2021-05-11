import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import Razorpay from "razorpay";
import shortid from "shortid";
import asyncHandler from "express-async-handler";
import crypto from "crypto";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectToDb from "./config/db.js";

dotenv.config();
connectToDb();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get("/root", (req, res, next) => {
  res.send("Root");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/hendrixmartLogo", (req, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  res.sendFile(path.join(__dirname, "images/hendrixmart.png"));
});

app.post(
  "/api/razorpay",
  asyncHandler(async (req, res) => {
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
  })
);

app.get(
  "/api/razorpay/verification",
  asyncHandler(async (req, res) => {
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
  })
);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in \"${process.env.NODE_ENV}\" mode on port: ${PORT}`.yellow
      .bold
  );
});
