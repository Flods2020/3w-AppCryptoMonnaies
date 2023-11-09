const mongoose = require("mongoose");
const { User } = require("./users.models");
const { Crypto } = require("./cryptos.models");
const { Currency } = require("./currencies.models");

const transactionSchema = new mongoose.Schema({
  user: {
    type: User,
    ref: "User",
    required: true,
  },
  crypto: {
    type: Crypto,
    ref: "Crypto",
    required: true,
  },
  amount: {
    type: Currency,
    amount: null,
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
