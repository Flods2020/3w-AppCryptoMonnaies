const { User } = require("../models/users.models");

const register = async (req, res, next) => {
  try {
    // tester si user existe deja
    const user = new User({
      pseudo: req.body.user,
      email: req.body.mail,
      password: req.body.pwd,
      isAdmin: false,
    });
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findUser(req.body.mail, req.body.pwd);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (e) {
    res.status(400).send("Email or password incorrect.");
  }
};

const logout = async (req, res) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });

    await req.user.save();
    res.send("Logged out");
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { register, login, logout };
