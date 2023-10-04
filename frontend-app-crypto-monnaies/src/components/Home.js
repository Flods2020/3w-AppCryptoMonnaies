import React from "react";
import "../styles/index.scss";
import Wallet from "./Wallet";
import Cryptos from "./Cryptos";

const Home = ({ coinsData }) => {
  return (
    <div className="acm-home-container">
      <Wallet />
      <Cryptos coinsData={coinsData} />
    </div>
  );
};

export default Home;
