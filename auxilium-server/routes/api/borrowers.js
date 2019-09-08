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

const { isExistingUser } = require("../../controllers/facial");

router.get("/test", (_req, res) => res.json({ message: "Borrowers works" }));

router.get("/", async (_req, res) => {
  const borrowers = await Borrower.find();
  return res.json(borrowers);
});

router.post("/register", async (req, res) => {
  const borrowerCount = await Borrower.count();
  const borrower = new Borrower({
    ...req.body,
    stellarId: borrowerCount
  });

  try {
    const isValid = await isExistingUser(req.body.imageURI);

    if (isValid.exists) {
      return res.status(403).json({ matchingFaceURL: isValid.matchingFace });
    }

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

router.post("/depositWait", async (req, res) => {
  axios.get(`${atmUrl}/deposit`, {
    method: "get"
  });
  return res.sendStatus(200);
});

router.post("/deposit", async (req, res) => {
  const { phoneNumber } = req.body;

  const borrower = await Borrower.findOne({ phoneNumber });

  let coinsDeposited = { data: { count: 0 } };

  coinsDeposited = await axios.get(`${atmUrl}/depositPersisted`);
  const stellarId = await Transaction.find().count();

  await new Transaction({
    user: borrower._id,
    amount: parseInt(coinsDeposited.data.count),
    stellarId,
    atmId: 381
  }).save();

  await submitTransaction({
    u: borrower.stellarId,
    t: stellarId,
    a: coinsDeposited.data.count
  });

  return res.json({ coinsDeposited: coinsDeposited.data.count });
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

  const borrower = await Borrower.findOne({ phoneNumber });

  axios.post(`${atmUrl}/withdraw`, {
    amount: parseInt(withdrawAmount)
  });

  const stellarId = await Transaction.find().count();

  await new Transaction({
    user: borrower._id,
    amount: -1 * withdrawAmount,
    stellarId,
    atmId: 381
  }).save();

  await submitTransaction({
    u: borrower.stellarId,
    t: stellarId,
    a: -1 * withdrawAmount
  });

  return res.json({ amount: withdrawAmount });
});

router.post("/getTransactions", async (req, res) => {
  const { _id } = req.body;

  const transactions = await Transaction.find({ user: _id });

  return res.json(transactions);
});

module.exports = router;
