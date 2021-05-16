import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
} from "../controllers/productController.js";
import { adminAuth, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(authMiddleware, adminAuth, deleteProductById);

export default router;
