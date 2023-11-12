const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { mongooseConnect } = require("./config/mongooseDatabase.js");
const cryptoRoutes = require("./routes/cryptos.routes");
const userRoutes = require("./routes/users.routes.js");
const transactionRoutes = require("./routes/transactions.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors());
app.use(express.static("public"));

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Cryptos */
app.use("/crypto-monnaies", cryptoRoutes);

/* Users */
app.use("/users", userRoutes);

/* Transactions */
app.use("/transactions", transactionRoutes);

/* Wallets */
app.use("/wallets", require("./routes/wallets.routes.js"));

mongooseConnect().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`****** SERVEUR CONNECTÉ sur le Port ${PORT}******"`.blue);
});
