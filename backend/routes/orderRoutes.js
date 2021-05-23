import express from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { authMiddleware, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router
  .route("/")
  .post(authMiddleware, createOrder)
  .get(authMiddleware, adminAuth, getOrders);
router.route("/myorders").get(authMiddleware, getUserOrders);
router.route("/:id").get(authMiddleware, getOrderById);
router.route("/:id/pay").put(authMiddleware, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(authMiddleware, adminAuth, updateOrderToDelivered);

export default router;
