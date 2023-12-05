const express = require("express");
const { Wallet } = require("../models/wallets.models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const wallets = await Wallet.find({});
    res.send(wallets);
  } catch (error) {
    res.status(401).send(e);
  }
});

router.post("/create", async (req, res) => {
  // const { user, cryptoTotal, currencyTotal } = req.body;

  try {
    const wallet = new Wallet({
      user: req.body.user,
      balance: req.body.balance,
      cryptoTotal: req.body.cryptoTotal,
      currencyTotal: req.body.currencyTotal,
      cryptoWallet: req.body.cryptoWallet,
      currencyWallet: req.body.currencyWallet,
    });

    const savedWallet = await wallet.save();
    res.status(201).send({ wallet: savedWallet });
  } catch (e) {
    res.status(401).send(e);
  }
});

module.exports = router;
