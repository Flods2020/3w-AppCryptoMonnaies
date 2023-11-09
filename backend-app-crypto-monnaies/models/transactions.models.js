const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  crypto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crypto",
    required: true,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
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
  transactionType: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };
