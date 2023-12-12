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
import { currenciesData } from "../helper/data-currencies";

const Wallet = () => {
  // const transactionsData = useSelector((state) => state.transactions);
  // const userProfile = useSelector((state) => state.users);
  const cryptoData = useSelector((state) => state.cryptos);

  const [transacs, setTransacs] = useState();
  const [userWallet, setUserWallet] = useState();

  // const [cryptW, setCryptW] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // A Corriger
  // const findCrypto = async (objId) => {
  //   let crptInWallet = "";
  //   console.log("objId ::: ", objId);
  //   if (objId === "654c22c80e38f2fa74835500") {
  //     crptInWallet = await cryptoData.cryptos.filter(
  //       (crp) => crp.id === "bitcoin"
  //     );
  //     console.log("cryptW ::: ", crptInWallet);
  //     return crptInWallet;
  //   }
  // };

  const findCrypto = (indX) => {
    if (indX === 0) {
      return "btc";
    } else if (indX === 1) {
      return "eth";
    } else if (indX === 2) {
      return "usdt";
    } else if (indX === 3) {
      return "sol";
    } else if (indX === 4) {
      return "usdc";
    }
  };

  const findCurrency = (currId) => {
    const currency = currenciesData.find((curr) => curr[1].id === currId);
    return currency;
  };

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
    };
    !userWallet && fetchUserWallet();
    // console.log("userWallet ::: ", userWallet);
  }, [userWallet, fetchUserProfile]);

  // useEffect(() => {
  //   console.log(cryptoData);
  // }, []);

  return (
    <div className="acm-wallet-container">
      <h2>Mon Portefeuille</h2>
      {!isEmpty(userWallet) ? (
        <div className="wallet-display">
          <span className="soldeSpan">
            Votre solde actuel :
            <div id="soldes">{userWallet[0].balance.toLocaleString()} $</div>
          </span>

          <div className="wallet-currency-container">
            {userWallet &&
              userWallet[0].currencyWallet.map((curr, i) => (
                <div className="wallet-currency-balance" key={i}>
                  <h4>
                    Votre devise fiat : {findCurrency(curr.currency)[1].name}
                  </h4>
                  <span className="currency-infos">
                    Solde : {curr.amount.toLocaleString()}{" "}
                    {findCurrency(curr.currency)[1].symbol}
                  </span>
                </div>
              ))}
          </div>

          <div className="wallet-crypto-container">
            <h4> Vos crypto-monnaies </h4>
            {cryptoData ? (
              userWallet[0].cryptoWallet.map((crpW, i) => (
                <div className="wallet-crypto-infos" key={i}>
                  {crpW && (
                    <span className="crypto-infos">
                      {crpW.amount}{" "}
                      {cryptoData.cryptos
                        .find((cr) => cr.symbol === findCrypto(i))
                        .symbol.toUpperCase()}{" "}
                      ==&gt;{" "}
                      {(
                        crpW.amount *
                        cryptoData.cryptos.find(
                          (cr) => cr.symbol === findCrypto(i)
                        ).current_price
                      )
                        // .toFixed(2)
                        .toLocaleString()}{" "}
                      $
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div>Trop de requêtes vers l'API</div>
            )}
            <div className="wallet-crypto-balance">
              Total Crypto : {userWallet[0].cryptoTotal.toLocaleString()} $
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
