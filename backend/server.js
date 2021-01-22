const express = require("express");
const { guitars } = require("./data/guitars");

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

app.listen(5000, () => {
  console.log(`listening on port ${5000 || process.env.PORT}`);
});
