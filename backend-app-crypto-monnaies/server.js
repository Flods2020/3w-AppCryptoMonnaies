const express = require("express");
const colors = require("colors");
const app = express();
const PORT = 5000;

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Cryptos */
app.use("/", require("./routes/cryptos.routes.js"));
app.use("/users", require("./routes/users.routes.js"));

/* Wallets */
app.use("/wallets", require("./routes/wallets.routes.js"));

app.listen(PORT, () => {
  console.log("****** SERVEUR CONNECTÉ ******".blue);
});
