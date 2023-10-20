const mongoose = require("mongoose");
require("dotenv").config();

const mongooseConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Mongoose db connectée".bgGreen);
};

module.exports = {
  mongooseConnect,
};
