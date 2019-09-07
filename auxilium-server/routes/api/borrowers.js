const express = require("express");
const axios = require("axios");

const router = express.Router();

const { Borrower } = require("../../models/Borrower");

const { atmUrl } = require("../../config/serverUrls");

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

router.post("/withdraw", async (req, res) => {
  const { phoneNumber, withdrawAmount } = req.body;

  const coinsWithdrew = await fetch(`${atmUrl}/withdraw`, {
    method: "post",
    body: JSON.stringify({
      amount: 4
    })
  });

  return res.sendStatus(200);
});

router.post("/stellarReturn", (req, res) => {
  const { obj } = req.body;

  obj.forEach((elem) => {
    elem = elem.stellarid;
    Borrower.find({ elem }).then(found => {
      if (!found) {
        return res.status(404).json({ message: "borrower associated with this stellarID not found" });
      }
      return res.json({ found });
    });
  });
});

module.exports = router;

// axios.post(`${atmUrl}/withdraw`, {
//   method: "post",
//   timeout: 30000,
//   body: JSON.stringify({
//     amount: 4
//   })
// });

// axios
//   .get(`${atmUrl}/deposit`, {
//     method: "get",
//     timeout: 30000
//   })
//   .then(resp => console.log(resp))
//   .catch(err => console.log(err));
