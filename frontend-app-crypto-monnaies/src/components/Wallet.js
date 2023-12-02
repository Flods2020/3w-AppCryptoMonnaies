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

const Wallet = () => {
  // const transactionsData = useSelector((state) => state.transactions);
  // const userProfile = useSelector((state) => state.users);
  const cryptosData = useSelector((state) => state.cryptos);

  const [transacs, setTransacs] = useState();

  const [balance, setBalance] = useState(0);
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
    if (crypto === "btc") {
      convertedSpan.innerHTML = parseFloat(38786.6 * amount).toFixed(2);
      return convertedSpan;
    } else if (crypto === "eth") {
      convertedSpan.innerHTML = parseFloat(2093.92 * amount).toFixed(2);
      return convertedSpan;
    } else if (crypto === "usdt") {
      convertedSpan.innerHTML = parseFloat(1 * amount).toFixed(2);
      return convertedSpan;
    } else if (crypto === "usdc") {
      convertedSpan.innerHTML = parseFloat(0.92 * amount).toFixed(2);
      return convertedSpan;
    } else if (crypto === "busd") {
      convertedSpan.innerHTML = parseFloat(1 * amount).toFixed(2);
      return convertedSpan;
    }
  };

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
          disabled={!balance}
        >
          <h4>Cryptos</h4>
          {cryptosData &&
            cryptosData.cryptos.map((crypt, i) => (
              <div className="acm-wallet-crypto-container" key={i}>
                <label htmlFor={`balance-${crypt.name}`}>{crypt.name}</label>
                <input
                  id={`balance-${crypt.name}`}
                  onChange={(e) => {
                    setCryptoBalance(e.target.value);
                    convertCrypto(crypt.symbol, cryptoBalance);
                  }}
                  type={"number"}
                  step={"0.001"}
                />{" "}
                <span id={`span-${crypt.symbol}`}>0</span> $
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
