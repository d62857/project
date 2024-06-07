const express = require("express");
const router = express.Router();
const { User } = require("../Model/User.js");

router.post("/register", (req, res) => {
  console.log("user.js line6 실행중");
  console.log(req.body);

  const userData = new User(req.body);
  userData
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

module.exports = router;
