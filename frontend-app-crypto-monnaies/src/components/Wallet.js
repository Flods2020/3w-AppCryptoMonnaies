import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, userDataURL, userWalletURL } from "../helper/url_helper";
import axios from "axios";
import WalletCreator from "./WalletCreator";
import { isEmpty } from "../helper/Utils";
import { currenciesData } from "../helper/data-currencies";
import { setWalletData } from "../store/slices/walletsSlice";

const Wallet = () => {
  const cryptoData = useSelector((state) => state.cryptos);

  const [userWallet, setUserWallet] = useState();
  const [walletBalance, setWalletBalance] = useState();

  const dispatch = useDispatch();

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
        dispatch(setWalletData(userWallet));
      } catch (error) {
        console.error(error);
      }
    };
    !userWallet && fetchUserWallet();
    // console.log("userWallet ::: ", userWallet);
  }, [userWallet, fetchUserProfile, dispatch]);

  useEffect(() => {
    if (!isEmpty(userWallet)) {
      setWalletBalance(
        userWallet[0].currencyTotal +
          (userWallet[0].cryptoTotal ? userWallet[0].cryptoTotal : 0)
      );
    }
  }, [walletBalance, userWallet]);

  useEffect(() => {
    cryptoData && console.log(cryptoData);
  }, []);

  return (
    <>
      <div className="acm-wallet-container">
        <h2>Mon Portefeuille</h2>
        {!isEmpty(userWallet) ? (
          <div className="wallet-display">
            <span className="soldeSpan">
              Votre solde actuel :
              <div id="soldes">
                {walletBalance && walletBalance.toLocaleString()} $
              </div>
            </span>

            <div className="wallet-currency-container">
              {userWallet &&
                userWallet[0].currencyWallet.map((curr, i) => (
                  <div className="wallet-currency-balance" key={i}>
                    <h4>
                      Votre devise fiat : {findCurrency(curr.currency)[1].code}{" "}
                      - {findCurrency(curr.currency)[1].name}
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
                <div
                  style={{ color: "red", fontSize: "1.3em", margin: "20px" }}
                >
                  Trop de requêtes vers l'API
                </div>
              )}
              <div className="wallet-crypto-balance">
                Total Crypto : {userWallet[0].cryptoTotal.toLocaleString()} $
              </div>
            </div>
            <div className="buy-sell-btn-container">
              <div className="buy-sell-btns" id="buyBtn">
                Acheter des Crytpo monnaies
              </div>
              <div className="buy-sell-btns" id="sellBtn">
                Vendre des Crytpo monnaies
              </div>
            </div>
          </div>
        ) : (
          <WalletCreator />
        )}
      </div>
    </>
  );
};

export default Wallet;
