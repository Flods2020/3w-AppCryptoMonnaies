const express = require("express");
const { User } = require("../models/users.models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.json({ user });
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("User not found");
    res.status(200).send("User deleted");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.status(202).json({ user }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
