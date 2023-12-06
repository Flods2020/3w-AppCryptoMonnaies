import React, { useEffect, useState } from "react";
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
  const [cryptoBalance, setCryptoBalance] = useState();
  const [cryptoAmountInput, setCryptoAmountInput] = useState();
  const [dataCurrencies, setDataCurrencies] = useState();
  const [walletCurrency, setWalletCurrency] = useState();
  const [convertedSelectedCurrencyAmount, setConvertedSelectedCurrencyAmount] =
    useState();
  const [selectedCurrencyAmount, setSelectedCurrencyAmount] = useState(0);

  const handleCryptoWalletChange = async (index, amount, name) => {
    console.warn(amount);
    if (parseFloat(amount) > 0) {
      const selectedCrypto = (
        await axios.get(`${baseURL}${cryptosURL}`)
      ).data.cryptos.filter((cr) => cr.symbol === name.toUpperCase());
      const newCryptoWallet = [...cryptoWallet];
      if (selectedCrypto) {
        newCryptoWallet[index] = {
          selectedCrypto,
          amount: parseFloat(amount),
        };
      }
      setCryptoWallet(newCryptoWallet);
    } else if (Number(amount) === 0) {
      const newCryptoWallet = [...cryptoWallet];
      newCryptoWallet.splice(index, 1);
      setCryptoWallet(newCryptoWallet);
    }
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

    const filteredCurr = dataCurrencies.find(
      (curr) => monnaie.split("/")[1] === curr.code
    );

    setWalletCurrency(filteredCurr);

    spanDollar.innerHTML =
      "1 $ = " +
      filteredCurr.usdExchangeRate +
      " " +
      filteredCurr.symbol +
      " / ";
    spanEuro.innerHTML =
      "1 € = " + filteredCurr.eurExchangeRate + " " + filteredCurr.symbol;
    spanCurrencyAmount.innerHTML = filteredCurr.name;
    return [spanDollar, spanEuro, spanCurrencyAmount];
  };

  const convertCurrencyAmount = () => {
    if (selectedCurrencyAmount && walletCurrency) {
      setConvertedSelectedCurrencyAmount(
        selectedCurrencyAmount / walletCurrency.usdExchangeRate
      );
    } else {
      setConvertedSelectedCurrencyAmount(0);
    }
  };

  const createWallet = async (e) => {
    e.preventDefault();
    // USER
    const userData = await axios.get(`${baseURL}${userDataURL}`);
    const user = userData.data.user;
    // console.log("user ::: ", user);

    // BALANCE
    console.warn(
      "BALANCE ::: ",
      (
        parseFloat(convertedSelectedCurrencyAmount) + parseFloat(cryptoBalance)
      ).toFixed(2)
    );
    console.log(
      "converted Selected Currency Amount ::: ",
      convertedSelectedCurrencyAmount
    );
    console.log("crypto Total ::::", cryptoBalance);

    // CRYPTOS;
    console.log("cryptoWallet ::::", cryptoWallet);

    // DEVISES
    console.log("Currency:", walletCurrency);
    console.log("Currency Total:", selectedCurrencyAmount);

    console.log({
      user: user._id,
      balance:
        parseFloat(convertedSelectedCurrencyAmount.toFixed(2)) +
        parseFloat(cryptoBalance.toFixed(2)),
      cryptoTotal: parseFloat(cryptoBalance.toFixed(2)),
      currencyTotal: parseFloat(selectedCurrencyAmount),
      cryptoWallet,
      currencyWallet: {
        currency: walletCurrency._id, // chercher l'id
        amount: parseFloat(selectedCurrencyAmount),
      },
    });

    try {
      await axios.post(`${baseURL}${walletCreateURL}`, {
        user: user._id,
        balance:
          parseFloat(convertedSelectedCurrencyAmount.toFixed(2)) +
          parseFloat(cryptoBalance.toFixed(2)),
        cryptoTotal: parseFloat(cryptoBalance.toFixed(2)),
        currencyTotal: parseFloat(selectedCurrencyAmount),
        cryptoWallet,
        currencyWallet: [
          {
            currency: walletCurrency,
            amount: parseFloat(selectedCurrencyAmount),
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cryptoWallet) {
      const totalCryptoAmount = cryptoWallet.reduce((accumulator, crpto) => {
        if (crpto) {
          const selectedCrypto = cryptosData.cryptos.find(
            (cr) => cr.symbol === crpto.selectedCrypto[0].symbol.toLowerCase()
          );

          if (selectedCrypto) {
            console.log("accumulator -1 ::::: ", accumulator);
            accumulator += parseFloat(
              crpto.amount * selectedCrypto.current_price
            );
            console.log("accumulator ::::: ", accumulator);
          }
        }
        return accumulator;
      }, 0);

      if (!totalCryptoAmount) {
        console.log("All conditions not met, resetting accumulator to 0");
        setCryptoBalance(0);
      } else {
        setCryptoBalance(totalCryptoAmount);
      }
    } else {
      setCryptoBalance(0);
    }
  }, [cryptoWallet, cryptosData, cryptoBalance, convertCryptoAndDisplay]);

  useEffect(() => {
    convertCurrencyAmount();
  }, [selectedCurrencyAmount, walletCurrency]);

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
      console.log(dataCurrencies);
    };
    fetchDataCurrencies();
  }, [dataCurrencies]);

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
          {dataCurrencies &&
            dataCurrencies.map((curr, i) => (
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
              onChange={(e) => {
                convertCryptoAndDisplay(
                  crypt.symbol,
                  e.target.value === "0" || !e.target.value
                    ? 0
                    : parseFloat(e.target.value),
                  i
                );
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
