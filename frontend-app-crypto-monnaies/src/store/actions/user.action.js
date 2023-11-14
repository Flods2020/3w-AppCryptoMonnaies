import axios from "axios";

export const GET_USER = "GET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";

export const getUserProfile = () => {
  return async (dispatch) => {
    await axios.get("http://localhost:5000/users/me").then((res) => {
      console.log("get user Profile :::: ", res.data);
      dispatch({ type: GET_USER, payload: res.data });
    });
  };
};

export const logoutUserProfile = () => {
  return async (dispatch) => {
    return axios.post("http://localhost:5000/users/logout").then((res) => {
      console.log("log out user Profile :::: ", res.data);
      dispatch({ type: LOGOUT_USER, payload: res.data });
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

export const editUserProfile = (data) => {
  return async (dispatch) => {
    return axios.put("http://localhost:5000/users/me", data).then(() => {
      dispatch({ type: EDIT_USER, payload: data });
    });
  };
};

export const deleteUserProfile = () => {
  return async (dispatch) => {
    return axios.delete("http://localhost:5000/users/me").then((res) => {
      console.log("delete user Profile :::: ", res.data);
      dispatch({ type: DELETE_USER, payload: res.data });
    });
  };
};
