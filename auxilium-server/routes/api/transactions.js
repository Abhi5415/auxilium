const express = require("express");
const router = express.Router();

const { Transaction } = require("../../models/Transaction");

router.get("/test", (_req, res) => res.json({ message: "Transactions works" }));

router.get("/", async (_req, res) => {
  const transactions = Transaction.find();
  res.json(transactions);
});

router.get("/all", async (_req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.json(transactions);
  } catch (e) {
    return res.sendStatus(500);
  }
});

module.exports = router;
