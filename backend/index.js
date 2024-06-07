require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use("/project", express.static(path.join(__dirname, "/../frontend/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", require("./Router/user.js"));

app.listen(port, () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log(`it's running at http://localhost:${port}/project`);
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});
