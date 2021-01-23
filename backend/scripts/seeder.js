import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import connectToDb from "../config/db.js";

import guitars from "../data/guitars.js";
import users from "../data/users.js";

dotenv.config();
connectToDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = guitars.map((guitar) => {
      return { ...guitar, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log(`data imported`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`data destroyed`.red);
    process.exit();
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] == "destroy") {
  destroyData();
} else {
  importData();
}
