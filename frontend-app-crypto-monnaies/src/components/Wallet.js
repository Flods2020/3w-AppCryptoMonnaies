import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../helper/Utils";
import { baseURL, transactionsURL } from "../helper/url_helper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  addTransactionsData,
  setTransactionsData,
} from "../store/slices/transactionsSlice";
import WalletForm from "./WalletForm";
import { dataCurrencies } from "../helper/data-currencies";

const Wallet = () => {
  // const transactionsData = useSelector((state) => state.transactions);
  // const userProfile = useSelector((state) => state.users);
  const cryptosData = useSelector((state) => state.cryptos);

  const [transacs, setTransacs] = useState();

  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [convertedCrypto, setConvertedCrypto] = useState(0);
  const [currencyBalance, setCurrencyBalance] = useState(0);

  const [convertedbtc, setConvertedbtc] = useState(0);
  const [convertedeth, setConvertedeth] = useState(0);
  const [convertedusdt, setConvertedusdt] = useState(0);
  const [convertedusdc, setConvertedusdc] = useState(0);
  const [convertedbusd, setConvertedbusd] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!transactionsData) {
  //     axios
  //       .get(`${baseURL}${transactionsURL}`)
  //       .then((res) => dispatch(setTransactionsData(res.data)))
  //       .then(() => setTransacs(transactionsData));
  //   } else {
  //     setTransacs(transactionsData.transactions);
  //   }
  // }, [dispatch, transactionsData, transacs]);

  const addTransaction = () => {
    navigate("/wallet-page");
  };

  const createWallet = () => {
    console.log("Create Wallet");
  };

  const convertCrypto = (crypto, amount) => {
    const convertedSpan = document.querySelector("#span-" + crypto);
    const convertedSpanEuro = document.querySelector("#spanEuro-" + crypto);
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

  // useEffect(() => {
  //   dataCurrencies.forEach((curr) => console.log(curr));
  // }, []);

  return (
    <>
      <div className="acm-wallet-container">
        <h2>Mon Portefeuille</h2>
        <div className="wallet-btn" onClick={addTransaction}>
          Créer Portefeuille
        </div>

        <WalletForm
          formType={"create-wallet"}
          handleSubmit={createWallet}
          btnSub={"Créer"}
          disabled={cryptoBalance === 0}
        >
          <h4>Monnaies</h4>
          <p>Selectionnez votre monnaie</p>
          <div className="acm-wallet-currency-container">
            <select
              name=""
              id="currency-selector"
              onChange={(e) => displayExchangeRates(e.target.value)}
            >
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
                  onChange={(e) => {
                    convertCrypto(crypt.symbol, e.target.value);
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

        {/* <div className="wallet-transac">
          {!isEmpty(transacs) &&
            transacs.map((tr, i) => (
              <div className="transac-container" key={i}>
                <span tr={tr}>
                  {tr.transactionType === "buy" ? "Achat" : "Vente"} de{" "}
                  {tr.amount} € de {tr.crypto} /// {tr.user}
                </span>
              </div>
            ))}
        </div> */}
      </div>
    </>
  );
};

export default Wallet;
