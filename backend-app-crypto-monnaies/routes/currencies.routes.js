const express = require("express");
const { Currency } = require("../models/currencies.models");
const router = new express.Router();

router.post("/", async (req, res, next) => {
  const currency = new Currency(req.body);
  try {
    res.status(201).send({ currency });
    await currency.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res, next) => {
  const currencies = await Currency.find({});
  res.status(201).send(currencies);
});

module.exports = router;
