const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Wallets" });
});

router.post("/create", (req, res) => {
  console.log(req.body.solde);
  res.json({ message: req.body.crypto });
});

module.exports = router;
