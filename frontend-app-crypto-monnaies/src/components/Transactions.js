import React, { useEffect, useState } from "react";
import {
  addTransactionsData,
  setTransactionsData,
} from "../store/slices/transactionsSlice";
import { baseURL, transactionsURL } from "../helper/url_helper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isEmpty } from "../helper/Utils";

const Transactions = () => {
  const transactionsData = useSelector((state) => state.transactions);
  const userProfile = useSelector((state) => state.users);

  const [transacs, setTransacs] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!transactionsData) {
      axios
        .get(`${baseURL}${transactionsURL}`)
        .then((res) => dispatch(setTransactionsData(res.data)))
        .then(() => setTransacs(transactionsData));
    } else {
      setTransacs(transactionsData.transactions);
    }
  }, [dispatch, transactionsData, transacs]);

  return (
    <div className="wallet-transac">
      {!isEmpty(transacs) &&
        transacs.map((tr, i) => (
          <div className="transac-container" key={i}>
            <span tr={tr}>
              {tr.transactionType === "buy" ? "Achat" : "Vente"} de {tr.amount}{" "}
              € de {tr.crypto} /// {tr.user}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Transactions;
