import React, { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

const USER_REGEX = /^[a-zA-Z0-9_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form
        formType={"register"}
        handleSubmit={handleSubmit}
        btnSub={"S'inscrire"}
      >
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <InputForm
          handleChange={(e) => setUser(e.target.value)}
          type={"text"}
          name={"username"}
          innerRef={userRef}
          label={"Nom/Pseudo"}
          valid={validName}
          varia={user}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <AiOutlineCloseCircle /> <br />
          Le champs doit commencer par une lettre.
          <br />
          Le champs doit contenir de 3 à 24 caractères.
          <br />
          Sont permis lettres, chiffres et traits d'union _.
          <br />
        </p>

        <InputForm
          handleChange={(e) => setPwd(e.target.value)}
          type={"password"}
          name={"password"}
          label={"Mot de passe"}
          valid={validPwd}
          varia={pwd}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <AiOutlineCloseCircle /> <br />
          Le champs doit contenir de 8 à 24 caractères.
          <br />
          Le champs doit contenir une majuscule, une minuscule, un chiffre et un
          caractère spécial.
          <br />
          Sont permis lettres, chiffres et "!@#$%".
          <br />
        </p>

        <InputForm
          handleChange={(e) => setMatchPwd(e.target.value)}
          type={"password"}
          name={"confirm_pwd"}
          label={"Confirmation mot de passe"}
          valid={validMatch}
          varia={matchPwd}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "confirmPwd" : "offscreen"}
        >
          <AiOutlineInfoCircle /> <br />
          Ce champs doit être identique au "Mot de passe".
        </p>

        <InputForm
          // handleChange={(e) => setEmail(e.target.value)}
          label={"Email"}
          type={"email"}
        />
      </Form>
    </>
  );
};

export default Register;
