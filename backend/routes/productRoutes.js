import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createReview,
} from "../controllers/productController.js";
import { adminAuth, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authMiddleware, adminAuth, createProduct);

router.route("/:id/reviews").post(authMiddleware, createReview);

router
  .route("/:id")
  .get(getProductById)
  .delete(authMiddleware, adminAuth, deleteProductById)
  .put(authMiddleware, adminAuth, updateProduct);

export default router;
