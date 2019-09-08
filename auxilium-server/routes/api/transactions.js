const express = require("express");
const router = express.Router();

const { Borrower } = require("../../models/Borrower");
const { Transaction } = require("../../models/Transaction");

const { getTransactions } = require("../../controllers/stellar");

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

// router.get("/all", async (_req, res) => {
//   const stellarTransactions = await getTransactions();
//   const userTransactions = [];

//   stellarTransactions.forEach(async (transaction, i) => {
//     const stellarId = transaction.u;

//     const borrower = await Borrower.findOne({ stellarId });
//     if (borrower) {
//       const temp = Object.assign({}, borrower._doc);
//       temp.blockChainUrl = transaction.r;
//       temp.amount = transaction.a;
//       temp.date = transaction.d;
//       userTransactions.push(temp);
//     }
//   });

//   await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));

//   console.log(userTransactions);
//   userTransactions[userTransactions.length - 1].date =
//     "2019-09-07T04:05:37.456Z";
//   return res.json(userTransactions);
// });

module.exports = router;
