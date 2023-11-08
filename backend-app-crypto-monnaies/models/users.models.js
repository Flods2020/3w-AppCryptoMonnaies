const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    authTokens: [
      {
        authToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

// SUPPRIME L'AFFICHAGE DES PASSWORDS ET TOKENS SUR POSTMAN
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.authTokens;

  return user;
};

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "secrt");
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Erreur, email introuvable.");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Erreur, mauvais Mot de Passe.");
  return user;
};

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
