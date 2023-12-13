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
  const walletData = useSelector((state) => state.wallets);

  const [userWallet, setUserWallet] = useState();
  const [walletBalance, setWalletBalance] = useState();

  const [currency, setCurrency] = useState();

  const dispatch = useDispatch();

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
    // console.warn(currId);
    setCurrency(currenciesData.find((curr) => curr[1].id === currId));
    // console.log("currency ::: ", currency);
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
          .then((res) => dispatch(setWalletData(res.data[0])))
          .then(() => setUserWallet(walletData));
      } catch (error) {
        console.error(error);
      }
    };
    !userWallet && fetchUserWallet();
    userWallet && findCurrency(userWallet.currencyWallet[0].currency);
    // console.log("userWallet ::: ", userWallet);
  }, [userWallet, fetchUserProfile, dispatch, walletData]);

  useEffect(() => {
    if (!isEmpty(userWallet)) {
      setWalletBalance(
        userWallet.currencyTotal +
          (userWallet.cryptoTotal ? userWallet.cryptoTotal : 0)
      );
    }
  }, [walletBalance, userWallet]);

  // useEffect(() => {
  //   cryptoData && console.log(cryptoData);
  // }, []);

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
              <div className="wallet-currency-balance">
                {currency && (
                  <>
                    <h4>
                      Votre devise fiat : {currency[1].code} -{" "}
                      {currency[1].name}
                    </h4>
                    <span className="currency-infos">
                      Solde : {userWallet.currencyTotal.toLocaleString()}{" "}
                      {currency[1].symbol}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="wallet-crypto-container">
              <h4> Vos crypto-monnaies </h4>
              {cryptoData && userWallet.cryptoWallet ? (
                userWallet.cryptoWallet.map((crpW, i) => (
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
                        ).toLocaleString()}{" "}
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
                Total Crypto : {userWallet.cryptoTotal.toLocaleString()} $
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
