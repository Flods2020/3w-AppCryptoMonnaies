const mongoose = require("mongoose");
require("dotenv").config();

const mongooseConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Mongoose db connectée".bgGreen);
};

module.exports = {
  mongooseConnect,
};
