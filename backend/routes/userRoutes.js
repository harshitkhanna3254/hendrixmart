import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUserById,
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

router
  .route("/:id")
  .delete(authMiddleware, adminAuth, deleteUser)
  .get(authMiddleware, adminAuth, getUserById)
  .put(authMiddleware, adminAuth, updateUserById);

export default router;
