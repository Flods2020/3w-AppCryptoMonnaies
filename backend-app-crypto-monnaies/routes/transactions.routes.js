const express = require("express");
const { Transaction } = require("../models/transactions.models");
const router = new express.Router();

router.post("/", async (req, res, next) => {
  const transaction = new Transaction(req.body);
  try {
    res.status(201).send({ transaction });
    await transaction.save();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", (req, res, next) => {
  //   const transaction = new Transaction(req.body);
  //   res.json({ transaction });
});

router.patch("/", (req, res, next) => {
  //   const transaction = new Transaction(req.body);
  //   res.json({ transaction });
});

router.delete("/", (req, res, next) => {
  //   const transaction = new Transaction(req.body);
  //   res.json({ transaction });
});

module.exports = router;
