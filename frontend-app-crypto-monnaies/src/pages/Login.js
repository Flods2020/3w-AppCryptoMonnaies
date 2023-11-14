import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, loginURL } from "../helper/url_helper";
import { addUserProfile, getUserProfile } from "../store/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import configureAppStore from "../store/store";

const Login = () => {
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [shouldFetchUserProfile, setShouldFetchUserProfile] = useState(false);

  const user = useSelector((state) => state.userReducer);

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
    console.log("LOGIN uEff User Store:::", user);
    console.log("LOGIN uEff TOKEN :::", token);
    {
      !user && localStorage.removeItem("jwt");
    }
  }, []);

  useEffect(() => {
    if (shouldFetchUserProfile) {
      dispatch(getUserProfile());
    }
  }, [shouldFetchUserProfile]);

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
        console.log("User response login ::: ", response);
        // dispatch(addUserProfile(response.data.user));
        dispatch(getUserProfile());
        console.log("shouldFetchUserProfile :::", shouldFetchUserProfile);

        navigate("/home");
      } else {
        console.error("Réponse invalide");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
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
