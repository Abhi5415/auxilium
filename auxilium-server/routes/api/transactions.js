const express = require("express");
const router = express.Router();

const { Transaction } = require("../../models/Transaction");

router.get("/test", (_req, res) => res.json({ message: "Transactions works" }));

router.get("/", async (_req, res) => {
  const transactions = Transaction.find();
  res.json(transactions);
});

router.post("/getOutgoingTransactionsForUser", (req, res) => {
  const { userId } = req;

  Transaction.find({
    initiatedId: userId
  }).then(transactions => res.json(transactions));
});

router.post("/getIncomingTransactionsForUser", (req, res) => {
  const { userId } = req;

  Transaction.find({
    destinationId: userId
  }).then(transactions => res.json(transactions));
});

module.exports = router;
