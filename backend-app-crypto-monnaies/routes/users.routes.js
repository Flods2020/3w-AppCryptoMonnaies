const express = require("express");
const { User } = require("../models/users.models");
const router = new express.Router();

router.post("/", async (req, res, next) => {
  const newUser = new User(req.body);

  // newUser
  //   .generateAuthTokenAndSaveUser()
  //   .then((user, authToken) => res.status(201).json({ user, authToken }))
  //   .then(() => res.status(201).json(authToken))
  //   .catch((err) => res.status(400).json({ error: err }));

  try {
    const authToken = await newUser.generateAuthTokenAndSaveUser();
    res.status(201).send({ newUser, authToken });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (e) {
    res.status(400).send();
  }
});

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
  const updatedInfo = Object.keys(req.body);
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

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

module.exports = router;
