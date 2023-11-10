import React, { useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, loginURL } from "../helper/url_helper";

const Login = () => {
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${baseURL}${loginURL}`, { mail, pwd })
        .then(
          (response) =>
            (axios.defaults.headers.common = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.data.authToken}`,
            })
        )
        .then((response) => {
          console.log(response);
          navigate("/home");
        });
      console.log("User connecté");
    } catch (error) {
      console.error(error.response.data);
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
