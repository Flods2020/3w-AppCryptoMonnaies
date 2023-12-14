import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const WalletBuyCryptos = ({ walletBalance, currency }) => {
  const cryptosData = useSelector((state) => state.cryptos);
  const walletData = useSelector((state) => state.wallets);

  const convertCryptoToWalletCurrAndDisplay = useCallback(
    async (crypto, amount, index) => {
      const convertedSpan = document.querySelector("#span-" + crypto);

      const selectedCrypto = cryptosData.cryptos.find(
        (cr) => cr.symbol === crypto
      );

      convertedSpan.innerHTML =
        parseFloat(
          (
            selectedCrypto.current_price *
            amount *
            currency.usdExchangeRate
          )?.toFixed(2)
        )?.toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
          " " +
          currency.symbol ?? "N/A";

      return [convertedSpan];
    },
    [cryptosData]
  );

  // useEffect(() => {
  //   walletBalance && console.log("walletBalance :::: ", walletBalance);
  //   currency && console.log("currency :::: ", currency);
  // }, []);

  return (
    <div className="acm-wallet-buy-container">
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
                convertCryptoToWalletCurrAndDisplay(
                  crypt.symbol,
                  numericValue,
                  i
                );
              }}
              onInput={(e) => {
                // convertCryptoAndDisplay(
                //   crypt.symbol,
                //   e.target.value === 0 || !e.target.value
                //     ? 0
                //     : parseFloat(e.target.value),
                //   i
                // );
                console.log(e.target.value);
              }}
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
              {/* <span id={`spanEuro-${crypt.symbol}`}>€</span> */}
              <span className="spanBalance">
                /{" "}
                {walletBalance.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {currency.symbol}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WalletBuyCryptos;
