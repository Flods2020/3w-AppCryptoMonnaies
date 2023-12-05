import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { dataCurrencies } from "../helper/data-currencies";
import WalletForm from "./WalletForm";
import axios from "axios";
import { baseURL, cryptosURL, userDataURL } from "../helper/url_helper";

const WalletCreator = () => {
  const cryptosData = useSelector((state) => state.cryptos);

  const [cryptoWallet, setCryptoWallet] = useState([]);
  const [cryptoBalance, setCryptoBalance] = useState();
  const [walletCurrency, setWalletCurrency] = useState();
  const [selectedCurrencyAmount, setSelectedCurrencyAmount] = useState(0);

  const handleCryptoWalletChange = async (index, amount, name) => {
    const selectedCrypto = (
      await axios.get(`${baseURL}${cryptosURL}`)
    ).data.cryptos.filter((cr) => cr.symbol === name.toUpperCase());
    const newCryptoWallet = [...cryptoWallet];
    if (selectedCrypto) {
      newCryptoWallet[index] = { amount, selectedCrypto };
    }
    setCryptoWallet(newCryptoWallet);
  };

  const convertCryptoAndDisplay = async (crypto, amount, index) => {
    const convertedSpan = document.querySelector("#span-" + crypto);
    const convertedSpanEuro = document.querySelector("#spanEuro-" + crypto);

    const selectedCrypto = cryptosData.cryptos.find(
      (cr) => cr.symbol === crypto
    );

    //Appel à la BDD
    // if (amount) {
    //   const selectedCrypto = (
    //     await axios.get(`${baseURL}${cryptosURL}`)
    //   ).data.cryptos.filter((cr) => cr.symbol === crypto.toUpperCase());
    //   console.log("selectedCrypto ::: ", selectedCrypto);
    // }

    handleCryptoWalletChange(index, amount, crypto);

    convertedSpan.innerHTML = parseFloat(
      (selectedCrypto.current_price * amount).toFixed(2)
    ).toLocaleString();
    convertedSpanEuro.innerHTML = parseFloat(
      (selectedCrypto.current_price * 0.92 * amount).toFixed(2)
    ).toLocaleString();

    return [convertedSpan, convertedSpanEuro];
  };

  const displayExchangeRates = (monnaie) => {
    const spanDollar = document.querySelector("#spanCurrencyDollar");
    const spanEuro = document.querySelector("#spanCurrencyEuro");
    const spanCurrencyAmount = document.querySelector("#spanCurrencyAmount");

    const filteredCurr = dataCurrencies.filter(
      (curr) => monnaie.split("/")[1] === curr.code
    );

    setWalletCurrency(filteredCurr);

    spanDollar.innerHTML =
      "1 $ = " +
      filteredCurr[0].usdExchangeRate +
      " " +
      filteredCurr[0].symbol +
      " / ";
    spanEuro.innerHTML =
      "1 € = " + filteredCurr[0].eurExchangeRate + " " + filteredCurr[0].symbol;
    spanCurrencyAmount.innerHTML = filteredCurr[0].name;
    return [spanDollar, spanEuro, spanCurrencyAmount];
  };

  const createWallet = async (e) => {
    e.preventDefault();
    // USER
    const userData = await axios.get(`${baseURL}${userDataURL}`);
    const user = userData.data.user;
    console.log("user ::: ", user);

    // CRYPTOS;
    console.log("cryptoWallet ::::", cryptoWallet);

    // BALANCE
    console.warn("cryptoBalance ::::", cryptoBalance);

    // DEVISES
    console.log("Currency:", walletCurrency);
    console.log("selectedCurrencyAmount:", selectedCurrencyAmount);
  };

  useEffect(() => {
    const totalCryptoAmount = cryptoWallet.reduce((accumulator, crpto) => {
      if (crpto && crpto.amount !== undefined) {
        const selectedCrypto = cryptosData.cryptos.find(
          (cr) => cr.symbol === crpto.selectedCrypto[0].symbol.toLowerCase()
        );

        if (selectedCrypto) {
          accumulator += parseFloat(
            crpto.amount * selectedCrypto.current_price
          );
        }
      }
      return accumulator;
    }, 0);
    setCryptoBalance(totalCryptoAmount);
  }, [cryptoWallet, cryptosData]);

  //   useEffect(() => {
  //     cryptosData &&
  //       cryptosData.cryptos.map((cr) => {
  //         if (cr.symbol === "eth") {
  //           console.log(cr.current_price);
  //         }
  //       });
  //   }, [cryptosData]);

  return (
    <WalletForm
      formType={"create-wallet"}
      handleSubmit={createWallet}
      btnSub={"Créer"}
      //   disabled={cryptoBalance === 0}
    >
      <h4>Monnaies</h4>
      <p>Selectionnez votre monnaie</p>
      <div className="acm-wallet-currency-container">
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
          {dataCurrencies.map((curr, i) => (
            <option key={i}>
              {curr.name}/{curr.code}
            </option>
          ))}
        </select>
        <span id="spanCurrencyDollar"> $ / </span>
        <span id="spanCurrencyEuro"> €</span>
        <br />
        <span>
          Indiquez votre montant en <span id="spanCurrencyAmount">*</span>
        </span>
        <br />
        <input
          type="number"
          min={"0"}
          onChange={(e) => setSelectedCurrencyAmount(e.target.value)}
        />
      </div>

      <h4>Cryptos</h4>
      <p>Selectionnez vos cryptos et leurs montants</p>
      {cryptosData &&
        cryptosData.cryptos.map((crypt, i) => (
          <div className="acm-wallet-crypto-container" key={i}>
            <label htmlFor={`balance-${crypt.name}`}>{crypt.name}</label>
            <input
              id={`balance-${crypt.name}`}
              //   varia={crypt.symbol}
              varia={cryptoWallet}
              onChange={(e) => {
                convertCryptoAndDisplay(crypt.symbol, e.target.value, i);
              }}
              type={"number"}
              step={
                crypt.symbol.includes("btc") || crypt.symbol.includes("eth")
                  ? "0.001"
                  : "0.1"
              }
              min={"0"}
            />{" "}
            <span id={`span-${crypt.symbol}`}>0</span> $ --{" "}
            <span id={`spanEuro-${crypt.symbol}`}>0</span> €
          </div>
        ))}
    </WalletForm>
  );
};

export default WalletCreator;
