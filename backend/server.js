import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import guitars from "./data/guitars.js";
import connectToDb from "./config/db.js";

dotenv.config();
connectToDb();

const app = express();

app.get("/", (req, res) => {
  res.send("Root");
});

app.get("/api/products", (req, res) => {
  res.json(guitars);
});

app.get("/api/products/:id", (req, res) => {
  console.log(guitars);
  const guitar = guitars.find((guitar) => {
    return guitar._id == req.params.id;
  });
  res.json(guitar);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in \"${process.env.NODE_ENV}\" mode on port: ${PORT}`.yellow
      .bold
  );
});
