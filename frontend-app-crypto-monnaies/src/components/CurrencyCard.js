import React, { useEffect } from "react";

const CurrencyCard = ({ curr }) => {
  //   useEffect(() => {
  //     console.log(curr);
  //   }, []);

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
    </div>
  );
};

export default CurrencyCard;
