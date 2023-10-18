import React, { useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form formType={"login"} handleSubmit={handleSubmit} btnSub={"Connexion"}>
        <InputForm
          handleChange={(e) => setEmail(e.target.value)}
          label={"Email"}
          type={"email"}
        />
        <InputForm
          handleChange={(e) => setPassword(e.target.value)}
          label={"Mot de passe"}
          type={"password"}
        />
      </Form>
    </>
  );
};

export default Login;
