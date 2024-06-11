const express = require("express");
const router = express.Router();
const { User } = require("../Model/User.js");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

router.post("/update", async (req, res) => {
  const { uid, tmdbId, rating } = req.body;

  try {
    const user = await User.findOne({ uid: uid });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "해당하는 유저가 존재하지 않음" });
    }
    const rated = user.ratings.find((item) => item.tmdbId === tmdbId);
    if (rated) {
      // 평가 데이터가 이미 존재하는 경우, 업데이트
      rated.rating = rating;
    } else {
      user.ratings.push({ tmdbId: tmdbId, rating: rating }); // 평가 데이터가 없는 경우, 새로 추가
    }
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  const { uid, tmdbId } = req.body;
  try {
    const deleted = await User.updateOne(
      { _id: new ObjectId(uid) },
      { $pull: { ratings: { tmdbId: tmdbId } } }
    );
    res.status(200).json({ success: true });
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

module.exports = router;
