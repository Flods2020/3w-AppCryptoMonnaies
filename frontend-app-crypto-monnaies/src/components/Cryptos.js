import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import CryptoLine from "./CryptoLine";

const Cryptos = ({ coinsData }) => {
  const acmCryptos = ["btc", "eth", "usdt", "usdc", "busd"];
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
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    coinsData && console.log(coinsData);
  });

  return (
    <>
      <div className="acm-crypto-container">
        <h2>Cryptos Monnaies</h2>
        <ul className="acm-crypto-header">
          {tableHeader.map((el) => (
            <li key={el}>
              <input
                type="radio"
                name="header-el"
                id={el}
                defaultChecked={
                  el === orderBy || el === orderBy + "reverse" ? true : false
                }
                onClick={() => {
                  orderBy === el ? setOrderBy(el + "reverse") : setOrderBy(el);
                }}
              />
              <label htmlFor={el}>{el}</label>
            </li>
          ))}
        </ul>
        {coinsData &&
          coinsData
            .filter((coin) => acmCryptos.includes(coin.symbol))
            .map((coin, index) => (
              <CryptoLine key={index} coin={coin} index={index} />
            ))}
      </div>
    </>
  );
};

export default Cryptos;
