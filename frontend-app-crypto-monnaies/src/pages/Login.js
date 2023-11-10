import React, { useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import axios from "axios";

const baseURL = "http://localhost:5000/";
const loginURL = "users/login";

const Login = () => {
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${baseURL}${loginURL}`, { mail, pwd })
        .then((response) => console.log(response.data));
      console.log("User connecté");
    } catch (error) {
      console.error(error);
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
