import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  baseURL,
  transactionsURL,
  userDataURL,
  userWalletURL,
} from "../helper/url_helper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  addTransactionsData,
  setTransactionsData,
} from "../store/slices/transactionsSlice";
import WalletCreator from "./WalletCreator";
import { isEmpty } from "../helper/Utils";

const Wallet = () => {
  // const transactionsData = useSelector((state) => state.transactions);
  // const userProfile = useSelector((state) => state.users);

  const [transacs, setTransacs] = useState();
  const [userWallet, setUserWallet] = useState();

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

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${baseURL}${userDataURL}`);
      const user = response.data.user;
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        await axios
          .get(`${baseURL}${userWalletURL}`, fetchUserProfile())
          .then((res) => setUserWallet(res.data));
      } catch (error) {
        console.error(error);
      }
      console.log("userWallet ::: ", userWallet);
    };
    !userWallet && fetchUserWallet();
  }, [userWallet, fetchUserProfile]);

  return (
    <div className="acm-wallet-container">
      <h2>Mon Portefeuille</h2>
      {!isEmpty(userWallet) ? (
        <div className="wallet-display">
          <span className="soldeSpan">
            Votre solde actuel :<div id="soldes">{userWallet[0].balance} $</div>
          </span>

          <div className="wallet-crypto-container">
            <div className="wallet-crypto-balance">
              Total Crypto : {userWallet[0].cryptoTotal}
            </div>
          </div>
        </div>
      ) : (
        <WalletCreator />
      )}

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
  );
};

export default Wallet;
