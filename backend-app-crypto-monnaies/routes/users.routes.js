const express = require("express");
const { User } = require("../models/users.models");
const authentification = require("../middlewares/authentification");
const {
  register,
  login,
  logout,
  logoutAll,
  getUser,
  editUser,
  deleteUser,
  editPwd,
  checkPwd,
} = require("../controllers/userAuthController");
const router = new express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authentification, logout);

router.post("/logout/all", authentification, logoutAll);

router.get("/me", authentification, getUser);
router.get("/pwd/me", authentification, checkPwd);

router.put("/me", authentification, editUser);

router.put("/pwd/me", authentification, editPwd);

router.delete("/me", authentification, deleteUser);

module.exports = router;
