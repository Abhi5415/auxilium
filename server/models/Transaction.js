const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  type: {
    // SENT and RECEIVED
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  destinationId: {
    type: Schema.Types.ObjectId,
    ref: "transactions"
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("transactions", TransactionSchema);
