const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Les cryptos" });
});

router.post("/cryptos/add", (req, res) => {
  res.json({ crypto: req.body.crypto });
});

router.put("/crypto/:id", (req, res) => {
  res.json({ crypto: req.params.id });
});

module.exports = router;
