import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, loginURL } from "../helper/url_helper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData, setUserData } from "../store/slices/usersSlice";

const Login = () => {
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");

  const userProfile = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findToken = () => {
    const localStorageToken = localStorage.getItem("jwt");
    if (localStorageToken) {
      return localStorageToken;
    } else {
      return "";
    }
  };

  const token = findToken();

  useEffect(() => {
    if (userProfile.pseudo === "" && token) {
      localStorage.removeItem("jwt");
      navigate("/login");
    } else if (userProfile.pseudo === "" && !token) {
      navigate("/login");
    } else if (userProfile && !token) {
      dispatch(deleteUserData());
      navigate("/login");
    }
  }, [userProfile, token, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}${loginURL}`, { mail, pwd });
      if (response.data.authToken && response.data.user) {
        axios.defaults.headers.common = {
          "Content-Type": "application/json",
          Authorization: response.data.authToken,
        };

        localStorage.setItem("jwt", response.data.authToken);
        dispatch(setUserData(response.data.user));

        navigate("/home");
      } else {
        alert("Identifiants invalides");
      }
    } catch (error) {
      alert("Identifiants invalides");
    }
  };

  return (
    <>
      <Form
        formType={"login"}
        handleSubmit={handleSubmit}
        btnSub={"Connexion"}
        disabled={!mail || !pwd}
      >
        <InputForm
          handleChange={(e) => setMail(e.target.value)}
          label={"E-mail"}
          type={"email"}
        />
        <InputForm
          handleChange={(e) => setPwd(e.target.value)}
          label={"Mot de passe"}
          type={"password"}
        />
      </Form>
    </>
  );
};

export default Login;
