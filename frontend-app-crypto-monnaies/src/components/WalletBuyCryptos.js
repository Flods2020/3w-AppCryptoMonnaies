import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formattedCurrency } from "../helper/Utils";
import { baseURL, cryptosURL } from "../helper/url_helper";
import axios from "axios";

const WalletBuyCryptos = ({ currency }) => {
  const cryptosData = useSelector((state) => state.cryptos);
  const walletData = useSelector((state) => state.wallets);

  const [cryptoAmounts, setCryptoAmounts] = useState({});
  const [cryptoWallet, setCryptoWallet] = useState();
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

  const buyCrypto = async () => {
    console.log(cryptoAmounts);
    const updatedCryptoWallet = [...cryptoWallet];

    try {
      // await axios
      //   .get(`${baseURL}${userWalletURL}`)
      //   .then((res) => console.log(res.data[0].cryptoWallet));

      for (let [key, value] of Object.entries(cryptoAmounts)) {
        console.log(key, value);

        if (parseFloat(value) > 0) {
          try {
            const selectedCrypto = (
              await axios.get(`${baseURL}${cryptosURL}`)
            ).data.cryptos.find((cr) => cr.symbol === key.toUpperCase());

            if (selectedCrypto) {
              const existingCryptoIndex = cryptoWallet.findIndex(
                (crypto) => crypto?.selectedCrypto.symbol === key.toUpperCase()
              );

              if (existingCryptoIndex !== -1) {
                // Crypto existe dans le wallet, maj le amount
                const existingCrypto = {
                  ...updatedCryptoWallet[existingCryptoIndex],
                };
                existingCrypto.amount = parseFloat(
                  existingCrypto.amount + value
                );
                updatedCryptoWallet[existingCryptoIndex] = existingCrypto;
                setCryptoWallet(() => updatedCryptoWallet);
                console.log(
                  "updatedCryptoWallet[existingCryptoIndex].amount ::: ",
                  updatedCryptoWallet[existingCryptoIndex].amount
                );
                console.log(
                  "****************updatedCryptoWallet",
                  cryptoWallet
                );
              } else {
                // Crypto n'est pas dans le wallet, on l'ajoute
                //chercher à mettre au bon index selon la crypto
                const newCryptoWallet = [
                  ...cryptoWallet,
                  {
                    selectedCrypto,
                    amount: parseFloat(value),
                  },
                ];
                setCryptoWallet(() => newCryptoWallet);
                console.log(
                  "******************Ajout cryptoWallet",
                  selectedCrypto
                );
              }
              console.log("cryptoWallet ::: ", cryptoWallet);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cryptoWallet === undefined && setCryptoWallet(walletData.cryptoWallet);
    console.log("--------- cryptoWallet ::: ", cryptoWallet);
  }, [cryptoWallet]);

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

  // useEffect(() => {
  //   cryptoAmounts && console.log("cryptoAmounts :::: ", cryptoAmounts);
  // }, [cryptoAmounts]);

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
          onClick={buyCrypto}
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
