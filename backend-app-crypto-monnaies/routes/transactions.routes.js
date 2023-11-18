const express = require("express");
const _ = require("lodash");
const { Transaction } = require("../models/transactions.models");
const authentification = require("../middlewares/authentification");
const { Error } = require("mongoose");
const router = new express.Router();

router.post("/", async (req, res, next) => {
  const transaction = new Transaction(req.body);
  try {
    res.status(201).send(transaction);
    await transaction.save();
  } catch (e) {
    res.status(400).send(e);
  }
});

/* ALL TRANSACTIONS */
router.get("/", async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});
    res.send(transactions);
  } catch (error) {
    res.status(500).send(e);
  }
});

/* USER TRANSACTIONS */
router.get("/me", authentification, async (req, res, next) => {
  const user = req.user._id;
  try {
    const transactions = await Transaction.find({});
    const userTrans = transactions.filter(
      (tr) => tr.user.toString() === user.toString()
    );
    res.send(userTrans);
  } catch (e) {
    res.status(500).send(e);
  }
});

/* USER TRANSACTIONS SORTED BY*/
router.get("/me/sort/:property", authentification, async (req, res, next) => {
  const user = req.user._id;

  try {
    const transactions = await Transaction.find({});
    const userTrans = transactions.filter(
      (tr) => tr.user.toString() === user.toString()
    );
    const propertySort = req.params.property;
    if (!userTrans[0][propertySort]) {
      res.send(`Invalid property : "${propertySort}"`);
    }
    const sortedTransaction = _.sortBy(userTrans, [propertySort]);
    res.send(sortedTransaction);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/me", authentification, async (req, res, next) => {
  const transactionToDelete = req.body.id;

  try {
    await Transaction.findByIdAndRemove(transactionToDelete);
    res.status(201).send("Transac deleted");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
