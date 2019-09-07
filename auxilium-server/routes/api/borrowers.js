const express = require("express");
const router = express.Router();

const { Borrower } = require("../../models/Borrower");

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

router.post("/deposit", (req, res) => {
  const { phoneNumber } = req.body;

  return res.sendStatus(200);
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

router.post("/withdraw", (req, res) => {
  const { phoneNumber, withdrawAmount } = req.body;

  return res.sendStatus(200);
});

module.exports = router;
