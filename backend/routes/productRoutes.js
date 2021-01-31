import express from "express";
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const router = express.Router();

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const guitars = await Product.find({});
    console.log(guitars);
    res.json(guitars);
  })
);

// @desc     Fetch product by id
// @route    GET /api/products/:id
// @access   Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const guitar = await Product.findById(req.params.id);

    if (guitar) {
      res.json(guitar);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
