const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BorrowerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  imageURI: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  emergencyPin: {
    type: String,
    required: true
  },
  stellarId: {
    type: Number,
    required: true
  },
  maxAvailableCredit: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = {
  Borrower: mongoose.model("borrowers", BorrowerSchema)
};
