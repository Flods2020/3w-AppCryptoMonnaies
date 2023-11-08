const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  crypto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crypto",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
