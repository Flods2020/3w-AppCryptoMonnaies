import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useSelector } from "react-redux";
import { isEmpty } from "../helper/Utils";

const Wallet = () => {
  const transactionsDatas = useSelector((state) => state.transactionReducer);
  // console.log(transactionsDatas);
  const [transactions, setTransactions] = useState();

  // useEffect(() => {
  //   if (transactionsDatas) {
  //     try {
  //       for (const tr in transactionsDatas) {
  //         transactions.push(transactionsDatas[tr]);
  //       }
  //     } catch (err) {
  //       console.error(err.name);
  //     }
  //     console.log(transactions);
  //   }
  // }, []);

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
          {!isEmpty(transactionsDatas) &&
            transactionsDatas.map((tr, i) => {
              return (
                <div className="transac-container" key={i}>
                  <span tr={tr}>
                    {tr.transactionType === "buy" ? "Achat" : "Vente"} de{" "}
                    {tr.amount} € de {tr.crypto}
                  </span>
                </div>
              );
            })}
        </div>
        <div className="wallet-total">
          <span>Total :</span>
          <span>114,988.34 €</span>
        </div>
        <div className="wallet-btn">Consulter Portefeuille</div>
      </div>
    </>
  );
};

export default Wallet;
