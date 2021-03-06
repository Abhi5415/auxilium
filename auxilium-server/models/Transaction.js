const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "borrowers"
  },
  amount: {
    type: String,
    required: true
  },
  atmId: {
    type: String,
    required: true
  },
  stellarId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = {
  Transaction: mongoose.model("transactions", TransactionSchema)
};
