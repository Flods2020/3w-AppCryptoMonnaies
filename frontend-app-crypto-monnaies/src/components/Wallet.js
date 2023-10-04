import React from "react";
import "../styles/index.scss";

const Wallet = () => {
  return (
    <>
      <div className="acm-wallet-container">
        <h2>Mon Portefeuille</h2>
        <div className="wallet-display">
          <span>Soldes :</span>
          <div className="wallet-currencies-container">
            <span>1.20335 BTC</span>
            <span>5.74 ETH</span>
            <span>75 830 €</span>
          </div>
        </div>
        <div className="wallet-total">
          <span>Total :</span>
          <span>114,988.34 €</span>
        </div>
        <div className="wallet-transac">
          <span>+ 0.0023 BTC</span>
          <span>de Yannick NOAH</span>
        </div>
        <div className="wallet-btn">Consulter Portefeuille</div>
      </div>
    </>
  );
};

export default Wallet;
