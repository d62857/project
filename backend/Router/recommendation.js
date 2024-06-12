const express = require("express");
const router = express.Router();
const { User } = require("../Model/User.js");
const { spawn } = require("child_process");
const path = require("path");

router.post("/customized", async (req, res) => {
  const { mode, tmdbId, uid } = req.body;
  try {
    if (mode == "item") {
      return;
    } else if (mode == "user") {
      const user = await User.findOne({ uid });

      const new_user_ratings = {};
      user.ratings.forEach((item) => {
        new_user_ratings[item.tmdbId] = item.rating;
      });

      const scriptPath = path.join(
        __dirname,
        "../../recommender/recommendation.py"
      );
      const script = spawn("python3", [
        scriptPath,
        JSON.stringify(new_user_ratings),
      ]);

      let output = [];
      let sideOutput = [];
      script.stdout.on("data", (data) => {
        output += data.toString();
      });

      script.stderr.on("data", (data) => {
        sideOutput += data.toString();
      });

      script.on("close", (code) => {
        console.log("Script closed with code:", code);
        if (code !== 0) {
          console.error("Python script stderr:", sideOutput);
          return res
            .status(500)
            .json({ error: "Python script error", details: sideOutput });
        }

        console.log("Python script stdout:", output);
        try {
          const recommendations = JSON.parse(output);
          res.json(recommendations);
        } catch (err) {
          console.error("Failed to parse JSON:", err);
          res
            .status(500)
            .json({ error: "Failed to parse Python script output" });
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
