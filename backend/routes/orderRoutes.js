import express from "express";
import { createOrder, getOrderById } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router.route("/").post(authMiddleware, createOrder);
router.route("/:id").get(authMiddleware, getOrderById);

export default router;
