const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { mongooseConnect } = require("./config/mongooseDatabase.js");
const userRoutes = require("./routes/users.routes.js");
const cryptoRoutes = require("./routes/cryptos.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public"));

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Cryptos */
app.use("/crypto-monnaies", cryptoRoutes);
app.use("/users", userRoutes);

/* Wallets */
app.use("/wallets", require("./routes/wallets.routes.js"));

mongooseConnect().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`****** SERVEUR CONNECTÉ sur le Port ${PORT}******"`.blue);
});
