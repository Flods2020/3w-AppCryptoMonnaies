import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../helper/Utils";
import { baseURL, transactionsURL } from "../helper/url_helper";
import axios from "axios";
import {
  addTransactionsData,
  setTransactionsData,
} from "../store/slices/transactionsSlice";

const Wallet = () => {
  const transactionsData = useSelector((state) => state.transactions);

  const [transacs, setTransacs] = useState();

  const dispatch = useDispatch();

  const traData = {
    user: "Le Roi Henok",
    crypto: "Ethereum",
    currency: "617eb6465a51c65c",
    amount: 25,
    timestamp: Date.now(),
    transactionType: "sell",
  };

  const addTransaction = async () => {
    await axios
      .post(`${baseURL}${transactionsURL}`, traData)
      // .then((res) => console.log(res.data));
      .then(() => dispatch(addTransactionsData(traData)));
  };

  useEffect(() => {
    if (!transactionsData) {
      axios
        .get(`${baseURL}${transactionsURL}`)
        .then((res) => dispatch(setTransactionsData(res.data)))
        .then(() => setTransacs(transactionsData));
    } else {
      setTransacs(transactionsData.transactions);
    }
  }, [dispatch, transactionsData, transacs]);

  return (
    <>
      <div className="acm-wallet-container">
        <h2>Mon Portefeuille</h2>
        <div className="wallet-display">
          <span id="soldes">Soldes :</span>
          <div className="wallet-currencies-container">
            <span>1.20335 BTC</span>
            <span>5.74 ETH</span>
            <span>75 830.23 €</span>
          </div>
        </div>
        <div className="wallet-transac">
          {!isEmpty(transacs) &&
            transacs.map((tr, i) => (
              <div className="transac-container" key={i}>
                <span tr={tr}>
                  {tr.transactionType === "buy" ? "Achat" : "Vente"} de{" "}
                  {tr.amount} € de {tr.crypto}
                </span>
              </div>
            ))}
        </div>
        <div className="wallet-total">
          <span>Total :</span>
          <span>114,988.34 €</span>
        </div>
        <div className="wallet-btn" onClick={addTransaction}>
          Consulter Portefeuille
        </div>
      </div>
    </>
  );
};

export default Wallet;
