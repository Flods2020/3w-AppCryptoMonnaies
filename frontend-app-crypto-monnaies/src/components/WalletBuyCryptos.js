import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formattedCurrency } from "../helper/Utils";

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
        formattedCurrency(
          (selectedCrypto.current_price * amount) / currency.usdExchangeRate,
          currency.code,
          currency.locale
        ) ?? "N/A";

      return convertedSpan;
    },
    [cryptosData, currency]
  );

  useEffect(() => {
    // Calculer la somme totale à chaque changement dans les montants
    const totalAmount = Object.keys(cryptoAmounts).reduce(
      (accumulator, cryptoSymbol) => {
        const spanValue = document.querySelector(`#span-${cryptoSymbol}`);
        if (spanValue) {
          const amount =
            currency.code === "RUB" || currency.code === "EUR"
              ? parseFloat(
                  spanValue.innerText.replace(/\s/g, "").replace(",", ".")
                )
              : Number(
                  spanValue.innerText.replace(/[^\d.]/g, "").replace(",", ".")
                );
          if (!isNaN(amount)) {
            accumulator += amount;
          }
        }
        return accumulator;
      },
      0
    );

    // MAJ du total à afficher
    const totalSpan = document.querySelector(".total");
    if (totalSpan) {
      setTotalSpanAmount(totalAmount);
      totalSpan.innerHTML = formattedCurrency(
        totalAmount,
        currency.code,
        currency.locale
      );
    }
  }, [cryptoAmounts, currency]);

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
                const inputValue = e.target.value.trim();
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
                  : "0.01"
              }
              min={"0"}
              max={"100000"}
            />
            <div className="spanConvert-container">
              <span id={`span-${crypt.symbol}`}>{currency.symbol}</span>
              <span className="spanBalance">
                /{" "}
                {formattedCurrency(
                  walletData.currencyTotal,
                  currency.code,
                  currency.locale
                )}
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
          {formattedCurrency(
            walletData.currencyTotal,
            currency.code,
            currency.locale
          )}
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
