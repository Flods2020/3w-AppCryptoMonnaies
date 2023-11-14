import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER,
  LOGOUT_USER,
} from "../actions/user.action";

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      // console.log(action.payload);
      // if (action.payload) {
      return {
        // ...state,
        user: action.payload,
      };
    // } else {
    //   return state;
    // }
    case LOGOUT_USER:
      return initialState;
    case ADD_USER:
      // console.log(action.payload);
      return [action.payload, ...state];
    case EDIT_USER:
      return {
        ...action.payload,
        pseudo: action.payload.user,
        email: action.payload.mail,
        password: action.payload.pwd,
      };
    case DELETE_USER:
      return action.payload;
    default:
      return state;
  }
}
