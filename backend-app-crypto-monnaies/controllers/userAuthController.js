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

const logoutAll = async (req, res) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const getUser = async (req, res, next) => {
  res.send({ user: req.user, authToken: req.authTokens });
};

const editUser = async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  try {
    updatedInfo.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json({ user: req.user });
  } catch (e) {
    res.status(500).send(e);
  }
};

const checkPwd = async (req, res, next) => {
  console.log("User password ::: ", req.user.password);
  console.log("Body password ::: ", req.body.pwd);
  try {
    const updatedPwd = await User.checkHashedPassword(
      req.body.pwd,
      req.user.password
    );
    console.log(updatedPwd);
    if (updatedPwd) {
      // res.json({ user: req.user });
      res.json(updatedPwd);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const editPwd = async (req, res, next) => {
  console.log("User password ::: ", req.user.password);
  console.log("Body password ::: ", req.body.pwd);
  try {
    req.user.password = req.body.pwd;
    await req.user.save();
    res.json({ user: req.user });
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne(req.user);
    res.status(200).send("User deleted");
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  register,
  login,
  logout,
  logoutAll,
  getUser,
  checkPwd,
  editUser,
  editPwd,
  deleteUser,
};
