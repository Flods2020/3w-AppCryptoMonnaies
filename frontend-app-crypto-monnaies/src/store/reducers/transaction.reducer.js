import { GET_TRANSACTIONS } from "../actions/transaction.action";

const initialState = { transaction: "transaction1" };

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
