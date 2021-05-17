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

// @desc     Create a new product
// @route    POST /api/products
// @access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
};
