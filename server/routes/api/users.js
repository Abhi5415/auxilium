const express = require("express");
const router = express.Router();

const User = require("../../models/User").User;

router.get("/test", (req, res) => res.json({ message: "Users works" }));

router.get("/", async (req, res) => {
  const users = User.find();
  res.json(users);
});

module.exports = router;
