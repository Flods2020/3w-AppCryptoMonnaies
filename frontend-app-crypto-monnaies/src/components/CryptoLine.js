import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import PercentChange from "./PercentChange";

const CryptoLine = ({ coin, index }) => {
  const priceFormater = (num) => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat("us-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      }).format(num);
    } else {
      return num;
    }
  };

  const mktCapFormatter = (num) => {
    let newNum = String(num).split("").slice(0, -6);
    return Number(newNum.join(""));
  };

  return (
    <div className="crypto-line">
      <div className="crypto-infos">
        <div className="img">
          <img src={coin.image} height="20" alt="logo" />
        </div>
        <h4>{coin.name}</h4>
        <span>- {coin.symbol.toUpperCase()}</span>
        <a
          target="_blank"
          href={
            `https://www.coingecko.com/fr/pi%C3%A8ces/` + coin.id.toLowerCase()
          }
        >
          <FaInfoCircle alt="info-icon" />
        </a>
      </div>
      <div className="crypto-values">
        <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
        <p className="mktcap">
          {mktCapFormatter(coin.market_cap).toLocaleString()} M$
        </p>
        <p className="volume">{coin.total_volume.toLocaleString()} $</p>
        <PercentChange percent={coin.price_change_percentage_1h_in_currency} />
        <PercentChange percent={coin.price_change_percentage_24h_in_currency} />
        <PercentChange percent={coin.price_change_percentage_7d_in_currency} />
        <PercentChange percent={coin.price_change_percentage_30d_in_currency} />
        <PercentChange
          percent={coin.price_change_percentage_200d_in_currency}
        />
        <PercentChange percent={coin.price_change_percentage_1y_in_currency} />
        {coin.ath_change_percentage > -3 ? (
          <p>ATH !</p>
        ) : (
          <PercentChange percent={coin.ath_change_percentage} />
        )}
      </div>
    </div>
  );
};

export default CryptoLine;
