import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataCurrencies } from "../helper/data-currencies";
import WalletForm from "./WalletForm";
import axios from "axios";
import { baseURL, cryptosURL, userDataURL } from "../helper/url_helper";

const WalletCreator = () => {
  const userProfile = useSelector((state) => state.users);
  const cryptosData = useSelector((state) => state.cryptos);

  const [cryptos, setCryptos] = useState([]);
  const [cryptoField, setCryptoField] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [walletCurrency, setWalletCurrency] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCryptoFieldChange = async (index, value, name) => {
    const selectedCrypto = (
      await axios.get(`${baseURL}${cryptosURL}`)
    ).data.cryptos.filter((cr) => cr.symbol === name.toUpperCase());
    const newCryptoField = [...cryptoField];
    newCryptoField[index] = { value, selectedCrypto };
    setCryptoField(newCryptoField);
  };

  const convertCryptoAndDisplay = async (crypto, amount, index) => {
    const convertedSpan = document.querySelector("#span-" + crypto);
    const convertedSpanEuro = document.querySelector("#spanEuro-" + crypto);

    //Appel à la BDD
    // if (amount) {
    //   const selectedCrypto = (
    //     await axios.get(`${baseURL}${cryptosURL}`)
    //   ).data.cryptos.filter((cr) => cr.symbol === crypto.toUpperCase());
    //   console.log("selectedCrypto ::: ", selectedCrypto);
    // }

    handleCryptoFieldChange(index, amount, crypto);

    if (crypto === "btc") {
      convertedSpan.innerHTML = parseFloat(
        (38786.6 * amount).toFixed(2)
      ).toLocaleString();
      convertedSpanEuro.innerHTML = parseFloat(
        (35674.83 * amount).toFixed(2)
      ).toLocaleString();
    } else if (crypto === "eth") {
      convertedSpan.innerHTML = parseFloat(
        (2093.92 * amount).toFixed(2)
      ).toLocaleString();
      convertedSpanEuro.innerHTML = parseFloat(
        (1951.14 * amount).toFixed(2)
      ).toLocaleString();
    } else if (crypto === "usdt") {
      convertedSpan.innerHTML = parseFloat(
        (1 * amount).toFixed(2)
      ).toLocaleString();
      convertedSpanEuro.innerHTML = parseFloat(
        (0.92 * amount).toFixed(2)
      ).toLocaleString();
    } else if (crypto === "usdc") {
      convertedSpan.innerHTML = parseFloat(
        (0.92 * amount).toFixed(2)
      ).toLocaleString();
      convertedSpanEuro.innerHTML = parseFloat(
        (0.92 * amount).toFixed(2)
      ).toLocaleString();
    } else if (crypto === "busd") {
      convertedSpan.innerHTML = parseFloat(
        (1 * amount).toFixed(2)
      ).toLocaleString();
      convertedSpanEuro.innerHTML = parseFloat(
        (0.92 * amount).toFixed(2)
      ).toLocaleString();
    }
    return convertedSpan, convertedSpanEuro;
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
    return spanDollar, spanEuro, spanCurrencyAmount;
  };

  const createWallet = async (e) => {
    e.preventDefault();
    // USER
    // const userData = await axios.get(`${baseURL}${userDataURL}`);
    // const user = userData.data.user;
    // console.log("user ::: ", user);

    //CRYPTOS
    console.log("Cryptos:", cryptoField);
    console.log("Currency:", selectedCurrency);
  };

  useEffect(() => {
    walletCurrency && console.log("walletCurrency ::: ", walletCurrency[0]);
  }, [walletCurrency]);

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
        <input type="number" step={"10"} min={"0"} />
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
              varia={cryptoField}
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
