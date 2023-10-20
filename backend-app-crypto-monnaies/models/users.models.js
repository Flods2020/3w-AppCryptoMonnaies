// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: [true, "Le Pseudo est obligatoire"],
      unique: true,
      message: "Pseudo déjà existant",
    },
    email: {
      type: String,
      required: [true, "Email est obligatoire"],
      unique: true,
      message: "Cet email existe déjà dans notre base de données",
    },
    password: {
      type: String,
      required: [true, "Password obligatoire"],
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
