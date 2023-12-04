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
import WalletCreator from "./WalletCreator";

const Wallet = () => {
  // const transactionsData = useSelector((state) => state.transactions);
  // const userProfile = useSelector((state) => state.users);

  const [transacs, setTransacs] = useState();

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

  return (
    <>
      <div className="acm-wallet-container">
        <h2>Mon Portefeuille</h2>
        <WalletCreator />

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
