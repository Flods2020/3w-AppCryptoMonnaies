const express = require("express");
const { Wallet } = require("../models/wallets.models");
const authentification = require("../middlewares/authentification");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const wallets = await Wallet.find({});
    res.send(wallets);
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/me", authentification, async (req, res, next) => {
  const user = req.user;
  try {
    const wallets = await Wallet.find({});
    const userWallet = wallets.filter(
      (wallet) => wallet.user.toString() === user._id.toString()
    );
    res.send(userWallet);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/create", async (req, res) => {
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
