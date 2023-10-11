import React from "react";

const BuyCryptos = () => {
  const bCryptosOptions = [
    "Obtenir des Cryptos-monnaies",
    "Obtenir des devises",
    "Guide App Crypto Monnaies",
    "Convertisseur",
    "Actus",
  ];

  return (
    <div className="acm-bcryptos-container">
      <h2>
        Bienvenu sur App Crypto Monnaie, votre "Portecryptomonnaies" en ligne !
      </h2>
      <div className="bcryptos-options-container">
        {bCryptosOptions.map((option, i) => (
          <div className="bcrypto-option" key={i}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCryptos;
