const express = require("express");
const { User } = require("../models/users.models");
const authentification = require("../middlewares/authentification");
const {
  register,
  login,
  logout,
} = require("../controllers/userAuthController");
const router = new express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authentification, logout);

router.post("/logout/all", authentification, async (req, res) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/me", authentification, async (req, res, next) => {
  res.send(req.user);
});

router.patch("/me", authentification, async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  try {
    updatedInfo.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json({ user: req.user });
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/me", authentification, async (req, res, next) => {
  try {
    await User.deleteOne(req.user);
    res.status(200).send("User deleted");
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
