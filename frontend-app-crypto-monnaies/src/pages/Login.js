import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, loginURL } from "../helper/url_helper";
import { addUserProfile, getUserProfile } from "../store/actions/user.action";
import { useDispatch } from "react-redux";
import configureAppStore from "../store/store";

const Login = () => {
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [shouldFetchUserProfile, setShouldFetchUserProfile] = useState(false);

  // const store = configureAppStore();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldFetchUserProfile) {
      dispatch(getUserProfile());
    }
  }, [shouldFetchUserProfile]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post(`${baseURL}${loginURL}`, { mail, pwd })
  //       .then((response) => {
  //         axios.defaults.headers.common = {
  //           "Content-Type": "application/json",
  //           Authorization: response.data.authToken,
  //         };
  //         console.log(response.data.user);
  //         dispatch(addUserProfile(response.data.user));
  //       })
  //       .then((response) => {
  //         localStorage.setItem("jwt", response.data.Authorization);
  //         console.log("authToken :::: ", response.data.Authorization);
  //       });
  //     console.log("User connecté");
  //     navigate("/home");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}${loginURL}`, { mail, pwd });
      // Vérifiez si la réponse contient un authToken et un utilisateur
      if (response.data.authToken && response.data.user) {
        // Configurez le header pour inclure le token d'authentification
        axios.defaults.headers.common = {
          "Content-Type": "application/json",
          Authorization: response.data.authToken,
        };

        // Enregistrez le token dans le stockage local
        localStorage.setItem("jwt", response.data.authToken);

        // Dispatch l'action pour ajouter le profil utilisateur au store Redux
        console.log("User response login ::: ", response);
        // dispatch(addUserProfile(response.data.user));
        dispatch(getUserProfile());
        // setShouldFetchUserProfile(true);
        console.log("shouldFetchUserProfile :::", shouldFetchUserProfile);

        // Redirigez l'utilisateur vers la page d'accueil
        navigate("/home");
      } else {
        // Si la réponse ne contient pas les données attendues
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
