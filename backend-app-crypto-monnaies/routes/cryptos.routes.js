const express = require("express");
const { Crypto } = require("../models/cryptos.models");
const router = new express.Router();

router.post("/add", async (req, res) => {
  const crypto = new Crypto(req.body);
  try {
    res.status(201).send({ crypto });
    await crypto.save();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", (req, res) => {
  res.json({ message: "Les cryptos" });
});

router.put("/crypto/:id", (req, res) => {
  res.json({ crypto: req.params.id });
});

module.exports = router;
