const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  usdExchangeRate: {
    type: Number,
    required: true,
  },
  eurExchangeRate: {
    type: Number,
    required: true,
  },
  originCountry: {
    type: String,
    required: true,
  },
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = { Currency };
