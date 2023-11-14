const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  cryptoTotal: {
    type: Number,
    required: true,
  },
  currencyTotal: {
    type: Number,
    required: true,
  },
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
  ],
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
  ],
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = { Wallet };
