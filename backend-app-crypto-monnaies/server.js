const express = require("express");
const colors = require("colors");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public"));

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Cryptos */
app.use("/", require("./routes/cryptos.routes.js"));
app.use("/users", require("./routes/users.routes.js"));

/* Wallets */
app.use("/wallets", require("./routes/wallets.routes.js"));

app.listen(PORT, () => {
  console.log(`****** SERVEUR CONNECTÉ sur le Port ${PORT}******"`.blue);
});
