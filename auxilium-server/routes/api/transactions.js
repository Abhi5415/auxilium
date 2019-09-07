const express = require("express");
const router = express.Router();

const { Transaction } = require("../../models/Transaction");

router.get("/test", (req, res) => res.json({ message: "Transactions works" }));

router.get("/", async (req, res) => {
  const transactions = Transaction.find();
  res.json(transactions);
});

module.exports = router;
