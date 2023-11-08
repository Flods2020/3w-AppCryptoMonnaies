const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCapitalization: {
    type: Number,
    required: true,
  },
  dailyVolume: {
    type: Number,
    required: true,
  },
  percentageChange: {
    type: Number,
    required: true,
  },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
