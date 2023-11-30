import React from "react";
import "../styles/index.scss";
import CryptoLine from "./CryptoLine";
import { useSelector } from "react-redux";

const Cryptos = () => {
  const cryptoInfos = useSelector((state) => state.cryptos);

  const tableHeader = [
    "Prix",
    "Market Cap",
    "Volume",
    "1h",
    "1d",
    "1w",
    "1m",
    "6m",
    "1y",
    "ATH",
  ];

  return (
    <>
      <div className="acm-crypto-container">
        <h2>Cryptos Monnaies</h2>
        <ul className="acm-crypto-header">
          {tableHeader.map((el) => (
            <li key={el}>
              <input type="radio" name="header-el" id={el} />
              <label htmlFor={el}>{el}</label>
            </li>
          ))}
        </ul>
        <div className="cryptoLine-container">
          {cryptoInfos &&
            cryptoInfos.cryptos.map((coin, index) => (
              <CryptoLine key={index} coin={coin} index={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Cryptos;
