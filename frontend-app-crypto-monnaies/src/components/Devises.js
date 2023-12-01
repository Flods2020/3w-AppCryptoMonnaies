import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, currenciesURL } from "../helper/url_helper";
import { isEmpty } from "lodash";
import CurrencyCard from "./CurrencyCard";
import { useSelector } from "react-redux";

const Devises = () => {
  const cryptosInfos = useSelector((state) => state.cryptos);

  const [currencies, setCurrencies] = useState();

  const [today, setToday] = useState("");

  // API apilayer
  //   const myHeaders = new Headers();
  //   myHeaders.append("apikey", "IQNmZMOUKXRy6ymeiIXAZareCeZUNSEV");
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //     headers: myHeaders,
  //   };
  //   useEffect(() => {
  //     fetch(
  //       "https://api.apilayer.com/currency_data/live?source=USD&currencies=USD,EUR,GBP,JPY,RUB,CNY,CAD,CHF",
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((res) => setCurrencies(Object.entries(res.quotes).join(", ")))
  //       .catch((error) => console.log("error", error));
  //   }, [currencies]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${currenciesURL}`);
        setCurrencies(response.data);
        // console.log(Object.entries(response.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setToday(formattedDate);
  }, []);

  return (
    <div className="acm-devises-container">
      <h1>Devises</h1>
      <h2>{today}</h2>
      <div>
        {!isEmpty(currencies) &&
          Object.entries(currencies)
            .sort((a, b) => a[1].usdExchangeRate - b[1].usdExchangeRate)
            .map((curr, i) => (
              <>
                <CurrencyCard curr={curr[1]} cryptos={cryptosInfos} key={i} />
              </>
            ))}
      </div>
    </div>
  );
};

export default Devises;
