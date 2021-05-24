import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import connectToDb from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectToDb();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/hendrixmartLogo", (req, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  res.sendFile(path.join(__dirname, "images/hendrixmart.png"));
});

const root = path.resolve();
app.use("/uploads", express.static(path.join(root, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(root, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(root, "frontend", "build", "index.html"));
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in \"${process.env.NODE_ENV}\" mode on port: ${PORT}`.yellow
      .bold
  );
});
