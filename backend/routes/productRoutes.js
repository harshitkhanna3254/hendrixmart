import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router
  .route("/")
  .get(getProducts)
  .post(authMiddleware, adminAuth, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(authMiddleware, adminAuth, deleteProductById)
  .put(authMiddleware, adminAuth, updateProduct);

export default router;
