import React from "react";
import { formattedCurrency } from "../helper/Utils";

const CurrencyCard = ({ curr, cryptos }) => {
  return (
    <div className="acm-currencyCard">
      <div className="currency-infos">
        <h3>{curr.code}</h3>
        <p>{curr.name}</p>
      </div>
      <div className="currency-changes">
        <p>
          $ --&gt; {curr.usdExchangeRate.toFixed(2)} {curr.symbol}
        </p>
        <p>
          / € --&gt; {curr.eurExchangeRate.toFixed(2)} {curr.symbol}
        </p>
      </div>
      <div className="crypto-changes-container">
        {cryptos &&
          curr &&
          cryptos.cryptos.map((crp, i) => (
            <div className="crypto-changes" key={i}>
              <span>
                <h4>{crp.name}</h4>
                {formattedCurrency(
                  crp.current_price * curr.usdExchangeRate,
                  curr.code,
                  curr.locale
                )}
              </span>{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrencyCard;
