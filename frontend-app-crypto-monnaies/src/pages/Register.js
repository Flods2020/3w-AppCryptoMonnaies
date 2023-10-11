import React, { useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.warn("REGISTER FORM");
    // console.log(name);
    // console.log(email);
    // console.log(password);
  };
  return (
    <Form
      formType={"register"}
      handleSubmit={handleSubmit}
      btnSub={"S'inscrire"}
    >
      <InputForm
        handleChange={(e) => setName(e.target.value)}
        label={"Nom/Pseudo"}
        type={"name"}
      />
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
  );
};

export default Register;
