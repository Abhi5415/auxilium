const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
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
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = {
  User: mongoose.model("users", UserSchema)
};
