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

router.put("/buy-crypto", authentification, async (req, res) => {
  const user = req.user;
  try {
    const { currencyTotal, cryptoWallet, currencyWallet } = req.body;

    // Rechercher le portefeuille de l'utilisateur
    const userWallet = await Wallet.findOne({ user: user._id });

    if (!userWallet) {
      return res
        .status(404)
        .json({ error: "Portefeuille introuvable pour cet utilisateur" });
    }

    // Mettre à jour les champs si présents dans la requête
    if (currencyTotal !== undefined) userWallet.currencyTotal = currencyTotal;
    if (cryptoWallet !== undefined) userWallet.cryptoWallet = cryptoWallet;
    if (currencyWallet !== undefined)
      userWallet.currencyWallet = currencyWallet;

    // Enregistrer les modifications dans la base de données
    await userWallet.save();

    // Renvoyer le portefeuille mis à jour en réponse
    res.status(200).json({ wallet: userWallet });
  } catch (e) {
    console.error(e);
    res.status(500).send("Erreur lors de la mise à jour du portefeuille");
  }
});

module.exports = router;
