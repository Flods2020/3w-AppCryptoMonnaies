import axios from "axios";

export const GET_USER = "GET_USER";
export const ADD_USER = "ADD_USER";

export const getUserProfile = () => {
  return async (dispatch) => {
    await axios.get("http://localhost:5000/users/me").then((res) => {
      console.log("get user Profile :::: ", res.data);
      dispatch({ type: GET_USER, payload: res.data });
    });
  };
};

export const addUserProfile = (data) => {
  return async (dispatch) => {
    return axios.post("http://localhost:5000/users/login", data).then(() => {
      console.log("add user Profile :::: ", data);
      dispatch({ type: ADD_USER, payload: data });
    });
  };
};
