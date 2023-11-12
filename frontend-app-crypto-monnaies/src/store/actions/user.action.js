import axios from "axios";

export const GET_USER = "GET_USER";

export const getUserProfile = () => {
  return async (dispatch) => {
    const res = await axios
      .get("http://localhost:5000/users/me")
      .then((res) => {
        console.log("user Profile :::: ", res.data);
        dispatch({ type: GET_USER, payload: res.data });
      });
  };
};
