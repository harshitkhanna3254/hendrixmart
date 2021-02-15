import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/profile").get(authMiddleware, getUserProfile);

router.route("/").post(registerUser);

export default router;
