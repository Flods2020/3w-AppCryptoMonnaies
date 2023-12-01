import React from "react";
import "../styles/index.scss";
import Wallet from "../components/Wallet";
import Cryptos from "../components/Cryptos";
import Devises from "../components/Devises";

const Home = () => {
  return (
    <div className="acm-home-container">
      {/* <Wallet /> */}
      <Cryptos />
      <Devises />
    </div>
  );
};

export default Home;
