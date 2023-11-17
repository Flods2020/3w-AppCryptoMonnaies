const jwt = require("jsonwebtoken");
const { User } = require("../models/users.models");

const authentification = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, "secrt");
    const user = await User.findOne({
      _id: decodedToken._id,
      "authTokens.authToken": authToken,
    });
    if (!user) throw new Error();
    req.authTokens = authToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Veuillez vous authentifier.");
  }
};

module.exports = authentification;
