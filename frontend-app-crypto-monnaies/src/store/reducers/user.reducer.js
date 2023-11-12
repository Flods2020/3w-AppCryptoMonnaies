import { GET_USER } from "../actions/user.action";

const initialState = { user: "Babar" };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
