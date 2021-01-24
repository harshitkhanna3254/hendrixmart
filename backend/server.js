import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectToDb from "./config/db.js";

dotenv.config();
connectToDb();

const app = express();
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Default middleware");
  next();
});

app.get("/", (req, res, next) => {
  console.log("Inside Root route");
  res.send("Root");
  next();
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in \"${process.env.NODE_ENV}\" mode on port: ${PORT}`.yellow
      .bold
  );
});
