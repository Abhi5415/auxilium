const express = require("express");
const router = express.Router();

const { User } = require("../../models/User");

router.get("/test", (req, res) => res.json({ message: "Users works" }));

router.get("/", async (req, res) => {
  const users = User.find();
  res.json(users);
});

router.post("/register", (req, res) => {
  const {
    name,
    phone_number: phoneNumber,
    pin,
    emergency_pin: emergencyPin
  } = req;

  const user = new User({ ...req });
  user
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(200).json(err));
});

module.exports = router;
