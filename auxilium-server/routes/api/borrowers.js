const express = require("express");
const router = express.Router();

const { Borrower } = require("../../models/Borrower");

router.get("/test", (req, res) => res.json({ message: "Borrowers works" }));

router.get("/", async (req, res) => {
  const borrowers = Borrower.find();
  res.json(borrowers);
});

router.post("/borrowerRegistered", (req, res) => {
  const { phoneNumber } = req;

  Borrower.find({ phoneNumber }).then(borrower => {
    if (!borrower) {
      return res.status(404).json({ message: "borrower not found" });
    }
    return res.json({ firstName: borrower.firstName });
  });
});

router.post("/borrowerAuthVerify", (req, res) => {
  const { phoneNumber, securePin } = req;

  Borrower.find({ phoneNumber }).then(borrower => {
    if (!borrower) {
      return res.status(404).json({ message: "borrower not found" });
    }
    if (borrower.emergencyPin === securePin) {
      return res.json({ message: "calling the popo" });
    }
    if (borrower.pin !== securePin) {
      return res.status(404).json({ message: "incorrect pin" });
    }
    return res.status(200);
  });
});

router.post("/borrowerDeposit", (req, res) => {
  const { phoneNumber } = req;

  console.log("depositing.....");
});

router.post("/borrowerWithdrawal", (req, res) => {
  const { phoneNumber } = req;

  console.log("withdrawing...");
});

module.exports = router;
