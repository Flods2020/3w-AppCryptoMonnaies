const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currencyTotal: {
    type: Number,
    required: true,
  },
  cryptoWallet: [
    {
      selectedCrypto: {
        type: Object,
        ref: "Crypto",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  currencyWallet: [
    {
      currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = { Wallet };
