import React from "react";

const CurrencyCard = ({ curr, cryptos }) => {
  return (
    <div className="acm-currencyCard">
      <div className="currency-infos">
        <h4>{curr.name}</h4>
        <p>- {curr.code}</p>
        <p>- {curr.originCountry}</p>
      </div>
      <div className="currency-changes">
        <p>{curr.usdExchangeRate} $</p>
        <p>---- {curr.eurExchangeRate} €</p>
      </div>
      {cryptos &&
        cryptos.map((crp, i) => (
          <div className="crypto-changes">
            <span key={i}>
              {crp.name} :
              {parseFloat(
                (crp.current_price * curr.usdExchangeRate).toFixed(2)
              )}{" "}
              {crp.symbol.toUpperCase()}
            </span>{" "}
          </div>
        ))}
    </div>
  );
};

export default CurrencyCard;
