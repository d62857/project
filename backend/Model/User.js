const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  tmdbId: Number,
  rating: Number,
});

const userSchema = new mongoose.Schema(
  {
    userNum: Number,
    email: String,
    displayName: String,
    uid: String,
    ratings: [ratingSchema],
  },
  { collection: "users" }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
