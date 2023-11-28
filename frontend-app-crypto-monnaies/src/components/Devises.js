import React, { useEffect, useState } from "react";
import {
  EURcurrenciesChanges,
  USDcurrenciesChanges,
} from "../helper/data-currencies";

const Devises = () => {
  const [currencies, setCurrencies] = useState();

  const eurChanges = Object.entries(EURcurrenciesChanges);
  const usdChanges = Object.entries(USDcurrenciesChanges);

  const [today, setToday] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("apikey", "IQNmZMOUKXRy6ymeiIXAZareCeZUNSEV");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  // API
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
    // console.log(eurChanges[0][1]);
    // console.log(usdChanges[0][1]);
    USDcurrenciesChanges.forEach((usdCurr) => console.log(usdCurr));
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
        {eurChanges.map(([eurCurr], i) => (
          <li key={i}>{eurCurr}</li>
        ))}
      </div>
    </div>
  );
};

export default Devises;
