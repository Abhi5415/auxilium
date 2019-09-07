const express = require("express");
const router = express.Router();

const { Transaction } = require("../../models/Transaction");
const { User } = require("../../models/User");

router.get("/test", (req, res) => res.json({ message: "Transactions works" }));

router.get("/", async (req, res) => {
  const transactions = Transaction.find();
  res.json(transactions);
});

router.post("/getTransactionsForUser", (req, res) => {
  const { userId } = req;
});

module.exports = router;
