import express from "express";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/razorpayController.js";

const router = express.Router();

router.post("/", createRazorpayOrder);

router.route("/verification").get(verifyRazorpayPayment);

export default router;
