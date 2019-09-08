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

// router.get("/all", async (_req, res) => {
//   try {
//     const transactions = await Transaction.find().sort({ date: -1 });
//     return res.json(transactions);
//   } catch (e) {
//     return res.sendStatus(500);
//   }
// });

router.get("/all", async (_req, res) => {
  const stellarTransactions = await getTransactions();
  const userTransactions = [];

  for (let i = 0; i < stellarTransactions.length; i++) {
    let transaction = stellarTransactions[i];

    await (async function() {
      const stellarId = transaction.t;

      const localTransaction = await Transaction.findOne({ stellarId });

      if (localTransaction) {
        const temp = Object.assign({}, localTransaction._doc);
        temp.blockChainUrl = transaction.r;
        temp.amount = transaction.a;
        temp.date = localTransaction.date;
        userTransactions.push(temp);
      }
    })();
  }

  // show data from yesterday
  userTransactions.push({
    amount: -1,
    atmId: "381",
    blockChainUrl:
      "https://horizon-testnet.stellar.org/transactions/b5b99947f567bbeb4591034b31c97bd0e1e41b287234d6df876a9138bd79a8f8",
    date: "2019-09-07T08:42:18.348Z",
    stellarId: 1,
    user: "5d74bb9d25c3729954d96efe",
    __v: 0,
    _id: "5d74beee6aa66c9acde93016"
  });
  userTransactions.push({
    amount: 5,
    atmId: "381",
    blockChainUrl:
      "https://horizon-testnet.stellar.org/transactions/b5b99947f567bbeb4591034b31c97bd0e1e41b287234d6df876a9138bd79a8f8",
    date: "2019-09-07T08:00:18.348Z",
    stellarId: 1,
    user: "5d74bb9d25c3729954d96efe",
    __v: 0,
    _id: "5d74beee6aa66c9acde93016"
  });
  userTransactions.push({
    amount: 9,
    atmId: "381",
    blockChainUrl:
      "https://horizon-testnet.stellar.org/transactions/b5b99947f567bbeb4591034b31c97bd0e1e41b287234d6df876a9138bd79a8f8",
    date: "2019-09-07T08:58:18.348Z",
    stellarId: 1,
    user: "5d74bb9d25c3729954d96efe",
    __v: 0,
    _id: "5d74beee6aa66c9acde93016"
  });

  return res.json(userTransactions);
});

module.exports = router;
