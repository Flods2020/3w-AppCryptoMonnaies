import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import Wallet from "../components/Wallet";
import Cryptos from "../components/Cryptos";
import axios from "axios";
import BuyCryptos from "../components/BuyCryptos";
import { baseURL, userDataURL } from "../helper/url_helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userProfileData = useSelector((state) => state.userReducer);

  const [coinsData, setCoinsData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
      )
      .then((res) => setCoinsData(res.data));
  }, []);

  // useEffect(() => {
  //   try {
  //     axios.get(`${baseURL}${userDataURL}`).then((userData) => {
  //       setCurrentUser(userData.data);
  //       console.log(userData.data);
  //     });
  //   } catch (error) {
  //     console.error(error.response.data);
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="acm-home-container">
      <Wallet />
      <BuyCryptos />
      <Cryptos coinsData={coinsData} />
    </div>
  );
};

export default Home;
