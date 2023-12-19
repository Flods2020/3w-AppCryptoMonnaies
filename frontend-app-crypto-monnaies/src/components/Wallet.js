import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, userDataURL, userWalletURL } from "../helper/url_helper";
import axios from "axios";
import WalletCreator from "./WalletCreator";
import { formattedCurrency, isEmpty } from "../helper/Utils";
import { currenciesData } from "../helper/data-currencies";
import { setWalletData } from "../store/slices/walletsSlice";
import WalletBuyCryptos from "./WalletBuyCryptos";

const Wallet = () => {
  const cryptoData = useSelector((state) => state.cryptos);
  const walletData = useSelector((state) => state.wallets);

  const [userWallet, setUserWallet] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [cryptoBalance, setCryptoBalance] = useState();

  const [currency, setCurrency] = useState();

  const [displayWalletBuyCryptos, setDisplayWalletBuyCryptos] = useState(false);

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
    setCurrency(currenciesData.find((curr) => curr[1].id === currId));
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
  }, [userWallet, fetchUserProfile, dispatch, walletData, setCurrency]);

  useEffect(() => {
    if (!isEmpty(userWallet) && !isEmpty(currency)) {
      setWalletBalance(
        cryptoBalance / currency[1].usdExchangeRate +
          (userWallet.currencyTotal ? userWallet.currencyTotal : 0)
      );
    }
  }, [walletBalance, userWallet, currency, cryptoBalance]);

  useEffect(() => {
    if (userWallet && cryptoData) {
      const totalCryptoAmount = Object.values(userWallet.cryptoWallet).reduce(
        (accumulator, crpto) => {
          if (crpto) {
            const selectedCrypto = cryptoData.cryptos.find(
              (cr) => cr.symbol === crpto.selectedCrypto.symbol?.toLowerCase()
            );

            if (selectedCrypto) {
              accumulator += parseFloat(
                crpto.amount * selectedCrypto.current_price
              );
            }
          }
          return accumulator;
        },
        0
      );

      if (!totalCryptoAmount) {
        setCryptoBalance(0);
      } else {
        setCryptoBalance(totalCryptoAmount);
      }
    } else {
      setCryptoBalance(0);
    }
  }, [userWallet, cryptoData, setCryptoBalance]);

  return (
    <div className="acm-wallet-container">
      <h2>Mon Portefeuille</h2>
      {!isEmpty(userWallet) && currency ? (
        <div className="wallet-display">
          <span className="soldeSpan">
            Votre solde actuel :
            <div id="soldes">
              {walletBalance &&
                formattedCurrency(
                  walletBalance,
                  currency[1].code,
                  currency[1].locale
                )}
            </div>
          </span>

          <div className="wallet-currency-container">
            <div className="wallet-currency-balance">
              <>
                <h4>
                  Votre devise fiat : {currency[1].code} - {currency[1].name}
                </h4>
                <span className="currency-infos">
                  Solde :{" "}
                  {formattedCurrency(
                    userWallet.currencyTotal,
                    currency[1].code,
                    currency[1].locale
                  )}
                </span>
              </>
            </div>
          </div>

          <div className="wallet-crypto-container">
            <h4> Vos crypto-monnaies </h4>
            {cryptoData !== null && userWallet.cryptoWallet ? (
              userWallet.cryptoWallet.map((crpW, i) => (
                <div className="wallet-crypto-infos" key={i}>
                  {crpW && currency && (
                    <span className="crypto-infos">
                      {crpW.amount}{" "}
                      {cryptoData.cryptos
                        .find((cr) => cr.symbol === findCrypto(i))
                        .symbol.toUpperCase()}{" "}
                      ==&gt;{" "}
                      {formattedCurrency(
                        crpW.amount *
                          (cryptoData.cryptos.find(
                            (cr) => cr.symbol === findCrypto(i)
                          ).current_price /
                            currency[1].usdExchangeRate),
                        currency[1].code,
                        currency[1].locale
                      )}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div style={{ color: "red", fontSize: "1.3em", margin: "20px" }}>
                Trop de requêtes vers l'API
              </div>
            )}
            <div className="wallet-crypto-balance">
              Total Crypto :{" "}
              {cryptoBalance &&
                formattedCurrency(
                  cryptoBalance / currency[1].usdExchangeRate,
                  currency[1].code,
                  currency[1].locale
                )}
            </div>
          </div>
          <div className="buy-sell-btn-container">
            <div
              className="buy-sell-btns"
              id="buyBtn"
              onClick={() =>
                setDisplayWalletBuyCryptos(!displayWalletBuyCryptos)
              }
            >
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
      {displayWalletBuyCryptos && <WalletBuyCryptos currency={currency[1]} />}
    </div>
  );
};

export default Wallet;
