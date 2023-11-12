import { GET_TRANSACTIONS } from "../actions/transaction.action";

const initialState = {};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      // console.log(action.payload.transactions);
      return action.payload.transactions;
    default:
      return state;
  }
}
