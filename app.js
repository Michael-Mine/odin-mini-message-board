require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const router = require("./routes/router");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});
