const mongoose = require("mongoose");
const { User } = require("./users.models");
const { Crypto } = require("./cryptos.models");

const transferSchema = new mongoose.Schema({
  sender: {
    type: User,
    ref: "User",
    required: true,
  },
  receiver: {
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

module.exports = { Transfer };
