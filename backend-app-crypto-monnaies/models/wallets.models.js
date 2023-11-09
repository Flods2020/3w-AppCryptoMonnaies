const mongoose = require("mongoose");
const { User } = require("./users.models");
const { Crypto } = require("./cryptos.models");
const { Currency } = require("./currencies.models");

const walletSchema = new mongoose.Schema({
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
  currency: {
    type: Currency,
    ref: "Currency",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = { Wallet };
