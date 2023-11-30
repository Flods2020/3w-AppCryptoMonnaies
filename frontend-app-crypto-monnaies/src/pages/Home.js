import React from "react";
import "../styles/index.scss";
import Wallet from "../components/Wallet";
import Cryptos from "../components/Cryptos";

const Home = () => {
  return (
    <div className="acm-home-container">
      <Wallet />
      <Cryptos />
    </div>
  );
};

export default Home;
