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

const Wallet = () => {
  const transactionsData = useSelector((state) => state.transactions);
  const userProfile = useSelector((state) => state.users);

  const [transacs, setTransacs] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const traData = {
  //   user: "614c9e2b891e187e4e52f880",
  //   crypto: "61541f2ef5a038001cb7f0e0",
  //   currency: "617eb6465a51c65c6c24f96a",
  //   amount: parseInt(Math.random() * 100),
  //   timestamp: Date.now(),
  //   transactionType: "sell",
  // };

  // const addTransaction = async () => {
  //   await axios
  //     .post(`${baseURL}${transactionsURL}`, traData)
  //     .then(() => dispatch(addTransactionsData(traData)));
  // };

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

  return (
    <>
      <div className="acm-wallet-container">
        <h2>Mon Portefeuille</h2>
        <div className="wallet-btn" onClick={addTransaction}>
          Créer Portefeuille
        </div>
        {/* <div className="wallet-display">
          <span id="soldes">Soldes :</span>
          <div className="wallet-currencies-container">
            <span>1.20335 BTC</span>
            <span>5.74 ETH</span>
            <span>75 830.23 €</span>
          </div>
        </div>
        <div className="wallet-total">
          <span>Total :</span>
          <span>114,988.34 €</span>
        </div>
        <div className="wallet-transac">
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
