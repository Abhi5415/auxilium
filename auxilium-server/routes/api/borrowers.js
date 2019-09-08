const express = require("express");
const axios = require("axios");

const router = express.Router();

const { Borrower } = require("../../models/Borrower");
const { Transaction } = require("../../models/Transaction");
const { atmUrl } = require("../../config/serverUrls");
const {
  getTransactions,
  submitTransaction
} = require("../../controllers/stellar");

router.get("/test", (_req, res) => res.json({ message: "Borrowers works" }));

router.get("/", async (_req, res) => {
  const borrowers = await Borrower.find();
  return res.json(borrowers);
});

router.post("/register", async (req, res) => {
  req.body.imageURI =
    req.body.imageURI ||
    "https://jwhitephoto.com/wp-content/uploads/2017/11/metro-detroit-birmingham-headshot-photographer-jeff-white-jwhitephoto-11-725x1024.jpg";

  const borrowerCount = await Borrower.count();
  const borrower = new Borrower({
    ...req.body,
    stellarId: borrowerCount
  });

  try {
    const result = await borrower.save();
    return res.json(result);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get("/all", async (req, res) => {
  try {
    const borrowers = await Borrower.find();
    return res.json(borrowers);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/isRegistered", async (req, res) => {
  const { phoneNumber } = req.body;

  const borrower = await Borrower.findOne({ phoneNumber });

  if (!borrower) {
    return res.status(404).json({ message: "borrower not found" });
  }

  return res.json({ firstName: borrower.firstName });
});

router.post("/changeMaximumValue", async (req, res) => {
  const { stellarId, maximumValue } = req.body;

  const borrower = await Borrower.findOne({ stellarId });

  if (!borrower) {
    return res.sendStatus(500);
  }

  try {
    await Borrower.update(
      { stellarId },
      { $set: { maxAvailableCredit: maximumValue } }
    );
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/authVerify", async (req, res) => {
  const { phoneNumber, securePin } = req.body;

  const borrower = await Borrower.findOne({ phoneNumber });

  if (!borrower) {
    return res.status(404);
  }
  if (borrower.emergencyPin === securePin) {
    return res.status(500);
  }
  if (borrower.pin !== securePin) {
    return res.status(404);
  }

  return res.sendStatus(200);
});

router.post("/deposit", async (req, res) => {
  const { phoneNumber } = req.body;

  const coinsDeposited = await axios
    .get(`${atmUrl}/deposit`, {
      method: "get",
      timeout: 45000
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  return res.json({ coinsDeposited });
});

router.post("/withdrawLimit", async (req, res) => {
  const { phoneNumber } = req.body;

  const borrower = await Borrower.findOne({ phoneNumber });

  if (!borrower) {
    return res.status(404);
  }

  // const widthdrawLimit =
  //   borrower.maxAvailableCredit - creditForUserTransactions;

  return res.json({ withdrawLimit: 5 });
});

router.post("/withdraw", async (req, res) => {
  const { phoneNumber, withdrawAmount } = req.body;

  await axios.post(`${atmUrl}/withdraw`, {
    method: "post",
    timeout: 45000,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: withdrawAmount
    })
  });

  return res.sendStatus(200);
});

router.post("/getTransactions", async (req, res) => {
  const { _id } = req.body;

  try {
    const transactions = await Transaction.find({ user: _id });
    return res.json(transactions);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/stellarReturn", async (req, res) => {
  const stellarTransactions = await getTransactions();
  const userObjects = [];

  console.log(stellarTransactions);

  stellarTransactions.forEach(async transaction => {
    const stellarId = transaction.u;

    const borrower = await Borrower.findOne({ stellarId });
    if (!borrower) {
      return;
    }
  });
});

module.exports = router;

// (async function() {
//   let shehryar;
//   try {
//     shehryar = await Borrower.findOne({ firstName: "Shehryar" });
//   } catch (e) {
//     console.log(e);
//   }
//   for (let i = 0; i < 9; i++) {
//     const ttt = new Transaction({
//       user: shehryar._id + "",
//       amount: Math.floor(Math.random() * 11),
//       atmId: Math.floor(Math.random() * 1000)
//     });
//     ttt
//       .save()
//       .then(a => console.log(a))
//       .catch(e => console.log(e));
//   }
// })();
