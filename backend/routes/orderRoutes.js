import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router.route("/").post(authMiddleware, createOrder);
router.route("/:id").get(authMiddleware, getOrderById);
router.route("/:id/pay").put(authMiddleware, updateOrderToPaid);

export default router;
