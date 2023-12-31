import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WalletForm from "./WalletForm";
import axios from "axios";
import {
  baseURL,
  cryptosURL,
  currenciesURL,
  userDataURL,
  walletCreateURL,
} from "../helper/url_helper";

const WalletCreator = () => {
  const cryptosData = useSelector((state) => state.cryptos);

  const [cryptoWallet, setCryptoWallet] = useState([]);
  const [dataCurrencies, setDataCurrencies] = useState();
  const [walletCurrency, setWalletCurrency] = useState();
  const [selectedCurrencyAmount, setSelectedCurrencyAmount] = useState(0);

  const handleCryptoWalletChange = useCallback(
    async (index, amount, name) => {
      if (amount > 0) {
        try {
          const selectedCrypto = (
            await axios.get(`${baseURL}${cryptosURL}`)
          ).data.cryptos.filter((cr) => cr.symbol === name.toUpperCase());
          const newCryptoWallet = [...cryptoWallet];
          if (selectedCrypto) {
            newCryptoWallet[index] = {
              selectedCrypto: selectedCrypto[0],
              amount: parseFloat(amount),
            };
          }
          setCryptoWallet(newCryptoWallet);
        } catch (error) {
          console.error(error);
        }
      } else if (amount === 0) {
        const newCryptoWallet = [...cryptoWallet];
        newCryptoWallet.splice(index, 1);
        setCryptoWallet(newCryptoWallet);
      }
    },
    [cryptoWallet]
  );

  const convertCryptoAndDisplay = useCallback(
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

      handleCryptoWalletChange(index, amount, crypto);

      return [convertedSpan, convertedSpanEuro];
    },
    [handleCryptoWalletChange, cryptosData]
  );

  const displayExchangeRates = (monnaie) => {
    const spanDollar = document.querySelector("#spanCurrencyDollar");
    const spanEuro = document.querySelector("#spanCurrencyEuro");
    const spanCurrencyAmount = document.querySelector("#spanCurrencyAmount");

    const filteredCurr = dataCurrencies.find(
      (curr) => monnaie.split("/")[1] === curr.code
    );

    setWalletCurrency(filteredCurr);

    spanDollar.innerHTML =
      "1 $ = " + filteredCurr.usdExchangeRate + " " + filteredCurr.symbol;
    spanEuro.innerHTML =
      "1 € = " + filteredCurr.eurExchangeRate + " " + filteredCurr.symbol;
    spanCurrencyAmount.innerHTML = filteredCurr.name;
    return [spanDollar, spanEuro, spanCurrencyAmount];
  };

  const createWallet = async (e) => {
    e.preventDefault();
    // USER
    const userData = await axios.get(`${baseURL}${userDataURL}`);
    const user = userData.data.user;

    try {
      await axios.post(`${baseURL}${walletCreateURL}`, {
        user: user._id,
        currencyTotal: parseFloat(selectedCurrencyAmount),
        cryptoWallet,
        currencyWallet: [
          {
            currency: walletCurrency,
            amount: parseFloat(selectedCurrencyAmount),
          },
        ],
      });
      alert("Votre portefeuille a bien été créé !");
      // navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        "Une erreur est survenue lors de la création de votre portefeuille."
      );
    }
  };

  useEffect(() => {
    const fetchDataCurrencies = async () => {
      try {
        if (!dataCurrencies) {
          const response = await axios.get(`${baseURL}${currenciesURL}`);
          setDataCurrencies(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataCurrencies();
  }, [dataCurrencies]);

  return (
    <WalletForm
      formType={"create-wallet"}
      handleSubmit={createWallet}
      btnSub={"Créer"}
      disabled={!walletCurrency}
    >
      <h4>Monnaies</h4>
      <div className="acm-wallet-currency-container">
        <span className="spanCurrencySelectText">
          Selectionnez votre monnaie
        </span>
        <div className="acm-wallet-currency-select-container">
          <select
            name=""
            id="currency-selector"
            defaultValue=""
            onChange={(e) => displayExchangeRates(e.target.value)}
          >
            {" "}
            <option value="" disabled hidden>
              Pas de devise selectionnée
            </option>
            {dataCurrencies &&
              dataCurrencies.map((curr, i) => (
                <option key={i}>
                  {curr.name}/{curr.code}
                </option>
              ))}
          </select>
          <div className="acm-wallet-currency-spans-container">
            <span id="spanCurrencyDollar"> $ </span> /
            <span id="spanCurrencyEuro"> €</span>
          </div>
        </div>

        <div
          className="currencyAmount-container"
          style={{ display: walletCurrency ? "block" : "none" }}
        >
          <span className="spanCurrencyAmountText">
            Indiquez votre montant en <span id="spanCurrencyAmount">*</span>
          </span>

          <input
            type="number"
            autoComplete="off"
            min={0}
            onChange={(e) => setSelectedCurrencyAmount(e.target.value)}
          />
        </div>
      </div>

      <h4>Cryptos</h4>
      <div className="acm-wallet-crypto-container">
        <span className="spanCryptoSelectText">
          Selectionnez vos cryptos et leurs montants
        </span>
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
                  convertCryptoAndDisplay(crypt.symbol, numericValue, i);
                }}
                onInput={(e) => {
                  convertCryptoAndDisplay(
                    crypt.symbol,
                    e.target.value === 0 || !e.target.value
                      ? 0
                      : parseFloat(e.target.value),
                    i
                  );
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
    </WalletForm>
  );
};

export default WalletCreator;
