const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { Post } = require("./Model/Post.js");

const app = express();
const port = 5000;
const MONGO_URL = process.env.DATABASE_URL;

app.use("/project", express.static(path.join(__dirname, "/../frontend/build")));

app.listen(port, () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log(`it's running at http://localhost:${port}/project`);
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/api/project", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
});
