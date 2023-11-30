import React from "react";

const CurrencyCard = ({ curr, cryptos }) => {
  return (
    <div className="acm-currencyCard">
      <div className="currency-infos">
        <h4>{curr.code}</h4>
        <p>{curr.name}</p>
      </div>
      <div className="currency-changes">
        <p>{curr.usdExchangeRate.toFixed(2)} $</p>
        <p>-- {curr.eurExchangeRate.toFixed(2)} €</p>
      </div>
      {cryptos &&
        cryptos.cryptos.map((crp, i) => (
          <div className="crypto-changes">
            <span key={i}>
              {crp.name} <br />
              {parseFloat(
                (crp.current_price * curr.usdExchangeRate).toFixed(2)
              ).toLocaleString()}{" "}
              {curr.symbol === "CHF" ? <p>&#x20A3;</p> : <p>{curr.symbol}</p>}
            </span>{" "}
          </div>
        ))}
    </div>
  );
};

export default CurrencyCard;
