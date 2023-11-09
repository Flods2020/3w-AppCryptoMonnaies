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
  },
  marketCapitalization: {
    type: Number,
  },
  dailyVolume: {
    type: Number,
  },
  percentageChange: {
    type: Number,
  },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = { Crypto };
