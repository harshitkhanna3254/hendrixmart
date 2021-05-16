import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const guitars = await Product.find({});
  // throw new Error("Not Authorized");
  res.json(guitars);
});

// @desc     Fetch product by id
// @route    GET /api/products/:id
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
  const guitar = await Product.findById(req.params.id);

  if (guitar) {
    // throw new Error("Product not found");
    res.json(guitar);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc     Delete product by id
// @route    DELETE /api/products/:id
// @access   Pricate/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const guitar = await Product.findById(req.params.id);

  if (guitar) {
    await guitar.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, deleteProductById };
