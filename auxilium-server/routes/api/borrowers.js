const express = require("express");
const axios = require("axios");

const router = express.Router();

const { Borrower } = require("../../models/Borrower");
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

router.post("/isRegistered", async (req, res) => {
  const { phoneNumber } = req.body;

  const borrower = await Borrower.findOne({ phoneNumber });

  if (!borrower) {
    return res.status(404).json({ message: "borrower not found" });
  }

  return res.json({ firstName: borrower.firstName });
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

router.post("/stellarReturn", async (req, res) => {
  const stellarTransactions = await getTransactions();
  const userObjects = [];

  console.log(stellarTransactions);

  stellarTransactions.forEach(transaction => {
    const stellarId = transaction.u;

    const borrower = await Borrower.findOne({ stellarId });
    if (!borrower) {
      return;
    }
  });
});

module.exports = router;