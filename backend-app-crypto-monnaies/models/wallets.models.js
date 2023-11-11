const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cryptoTotal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crypto",
    balance: Number,
    required: true,
    cryptoWallet: [
      {
        crypto: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        crypto: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        crypto: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        crypto: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        crypto: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  currencyTotal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    balance: Number,
    required: true,
    currencyWallet: [
      {
        currency: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        currency: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        currency: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        currency: mongoose.Schema.Types.ObjectId,
        balance: {
          type: Number,
          required: true,
        },
      },
    ],
  },

  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = { Wallet };
