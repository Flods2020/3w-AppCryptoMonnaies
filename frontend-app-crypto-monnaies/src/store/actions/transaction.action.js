import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";

export const getTransactions = () => {
  return (dispatch) => {
    return axios.get("http://localhost:5000/transactions").then((res) => {
      dispatch({ type: GET_TRANSACTIONS, payload: res.data });
    });
  };
};
