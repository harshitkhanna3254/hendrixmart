import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const user = User.findById(decoded.id).select("-password");

      console.log(user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized. Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized. No token found");
  }
});

export { authMiddleware };
