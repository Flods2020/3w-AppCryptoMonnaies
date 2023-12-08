import React from "react";

const CurrencyCard = ({ curr, cryptos }) => {
  return (
    <div className="acm-currencyCard">
      <div className="currency-infos">
        <h3>{curr.code}</h3>
        <p>{curr.name}</p>
      </div>
      <div className="currency-changes">
        <p>{curr.usdExchangeRate.toFixed(2)} $</p>
        <p>-- {curr.eurExchangeRate.toFixed(2)} €</p>
      </div>
      <div className="crypto-changes-container">
        {cryptos &&
          cryptos.cryptos.map((crp, i) => (
            <div className="crypto-changes" key={i}>
              <span>
                <h4>{crp.name}</h4>
                {parseFloat(
                  (crp.current_price * curr.usdExchangeRate).toFixed(2)
                ).toLocaleString()}{" "}
                {curr.symbol === "CHF" ? (
                  <span>&#x20A3;</span>
                ) : (
                  <span>{curr.symbol}</span>
                )}
              </span>{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrencyCard;
