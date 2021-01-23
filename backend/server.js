const express = require("express");
const { guitars } = require("./data/guitars");
require("dotenv").config();

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
    `Server running in \"${process.env.NODE_ENV}\" mode on port: ${PORT}`
  );
});
