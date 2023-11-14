import { ADD_USER, GET_USER } from "../actions/user.action";

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      // console.log(action.payload);
      if (action.payload) {
        return {
          // ...state,
          user: action.payload,
        };
      } else {
        return state;
      }
    case ADD_USER:
      // console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
