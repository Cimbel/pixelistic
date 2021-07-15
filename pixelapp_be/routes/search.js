const express = require("express");
const router = express.Router();
const { User } = require('../models/user');


router.post("/search", async (req, res) => {
  let users = await User.find({}).select("nickname avatar -_id");
  res.status(200).json({ users });
});

module.exports = router;
