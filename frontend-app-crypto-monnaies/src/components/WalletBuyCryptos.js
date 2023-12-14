import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WalletBuyCryptos = ({ currency }) => {
  const cryptosData = useSelector((state) => state.cryptos);
  const walletData = useSelector((state) => state.wallets);

  const [cryptoAmounts, setCryptoAmounts] = useState({});
  const [totalSpanAmount, setTotalSpanAmount] = useState();

  const convertCryptoToWalletCurrAndDisplay = useCallback(
    async (crypto, amount) => {
      const selectedCrypto = cryptosData.cryptos.find(
        (cr) => cr.symbol === crypto
      );

      const convertedSpan = document.querySelector("#span-" + crypto);

      convertedSpan.innerHTML =
        parseFloat(
          (selectedCrypto.current_price * amount) / currency.usdExchangeRate
        )?.toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
          " " +
          currency.symbol ?? "N/A";

      // const convertedAmount =
      //   parseFloat(
      //     (
      //       selectedCrypto.current_price *
      //       amount *
      //       currency.usdExchangeRate
      //     )?.toFixed(2)
      //   )?.toLocaleString("fr-FR", {
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   }) +
      //   " " +
      //   currency.symbol;

      return convertedSpan;
    },
    [cryptosData, currency]
  );

  // const convertCryptoToWalletCurrAndDisplayTotal = useCallback(
  //   async (crypto, amount, index) => {
  //     const selectedCrypto = cryptosData.cryptos.find(
  //       (cr) => cr.symbol === crypto
  //     );

  //     const convertedAmount =
  //       parseFloat(
  //         (
  //           selectedCrypto.current_price *
  //           amount *
  //           currency.usdExchangeRate
  //         )?.toFixed(2)
  //       )?.toLocaleString("fr-FR", {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 2,
  //       }) +
  //       " " +
  //       currency.symbol;

  //     return convertedAmount;
  //   },
  //   [cryptosData, currency]
  // );

  useEffect(() => {
    // Calculez la somme totale à chaque changement dans les montants
    const totalAmount = Object.keys(cryptoAmounts).reduce(
      (accumulator, cryptoSymbol) => {
        const spanValue = document.querySelector(`#span-${cryptoSymbol}`);
        if (spanValue) {
          const amount = parseFloat(
            spanValue.innerText.replace(/\s/g, "").replace(",", ".")
          );
          if (!isNaN(amount)) {
            // console.log("amount :::: ", amount);
            accumulator += amount;
          }
        }
        return accumulator;
      },
      0
    );

    // Mettez à jour le total affiché
    const totalSpan = document.querySelector(".total");
    if (totalSpan) {
      setTotalSpanAmount(totalAmount);
      // console.log("totalAmount ::: ", totalAmount);
      totalSpan.innerHTML =
        totalAmount
          .toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(".", ",") +
        " " +
        currency.symbol;
    }
  }, [cryptoAmounts, currency]);

  // useEffect(() => {
  //   // walletBalance && console.log("walletBalance :::: ", walletBalance);
  //   currency && console.log("currency :::: ", currency);
  // }, [currency]);

  return (
    <div className="acm-wallet-buy-container">
      <h3>Choisissez vos cryptos et leurs montants</h3>
      {cryptosData &&
        cryptosData.cryptos.map((crypt, i) => (
          <div className="acm-wallet-crypto-input-containers" key={i}>
            <label htmlFor={`balance-${crypt.name}`}>
              {crypt.name} <br /> {crypt.symbol.toUpperCase()}
            </label>
            <input
              id={`balance-${crypt.name}`}
              onChange={(e) => {
                const inputValue = e.target.value.trim(); // Supprimez les espaces
                const numericValue =
                  inputValue === "" ? 0 : parseFloat(inputValue);
                convertCryptoToWalletCurrAndDisplay(crypt.symbol, numericValue);
                setCryptoAmounts((prevAmounts) => ({
                  ...prevAmounts,
                  [crypt.symbol]: numericValue,
                }));
              }}
              // onInput={(e) => {
              // console.log(e.target.value);
              // }}
              type={"number"}
              autoComplete="off"
              step={
                crypt.symbol.includes("btc") || crypt.symbol.includes("eth")
                  ? "0.001"
                  : "0.1"
              }
              min={"0"}
              max={"10000"}
            />
            <div className="spanConvert-container">
              <span id={`span-${crypt.symbol}`}>{currency.symbol}</span>
              <span className="spanBalance">
                /{" "}
                {walletData.currencyTotal.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {currency.symbol}
              </span>
            </div>
          </div>
        ))}

      <div className="acm-wallet-crypto-total">
        TOTAL :{" "}
        <span
          className="total"
          style={{
            color:
              totalSpanAmount > walletData.currencyTotal
                ? "#b82020"
                : "#20b820",
          }}
        >
          00000
        </span>
        <span className="totalCurrencyBalance">
          {" "}
          /{" "}
          {walletData.currencyTotal.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {currency.symbol}
        </span>
      </div>
      <div className="acm-wallet-crypto-buy-btn-container">
        <button
          className="acm-wallet-crypto-buy-btn"
          disabled={
            totalSpanAmount > walletData.currencyTotal || !totalSpanAmount
          }
        >
          Acheter
        </button>
      </div>
    </div>
  );
};

export default WalletBuyCryptos;
