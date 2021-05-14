import express from "express";

import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { adminAuth, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

router
  .route("/")
  .post(registerUser)
  .get(authMiddleware, adminAuth, getAllUsers);

export default router;
