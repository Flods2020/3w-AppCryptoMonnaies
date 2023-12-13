import React, { useCallback } from "react";
import { useSelector } from "react-redux";

const WalletBuyCryptos = () => {
  const cryptosData = useSelector((state) => state.cryptos);

  const convertCryptoToWalletCurrAndDisplay = useCallback(
    async (crypto, amount, index) => {
      const convertedSpan = document.querySelector("#span-" + crypto);
      const convertedSpanEuro = document.querySelector("#spanEuro-" + crypto);

      const selectedCrypto = cryptosData.cryptos.find(
        (cr) => cr.symbol === crypto
      );

      convertedSpan.innerHTML =
        parseFloat(
          (selectedCrypto.current_price * amount)?.toFixed(2)
        )?.toLocaleString() + " $" ?? "N/A";

      convertedSpanEuro.innerHTML =
        parseFloat(
          (selectedCrypto.current_price * 0.92 * amount)?.toFixed(2)
        )?.toLocaleString() + " €" ?? "N/A";

      return [convertedSpan, convertedSpanEuro];
    },
    [cryptosData]
  );

  return (
    <div>
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
              <span id={`span-${crypt.symbol}`}>$</span>
              <span id={`spanEuro-${crypt.symbol}`}>€</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WalletBuyCryptos;
