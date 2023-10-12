import React, { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          {/* {errMsg} */}
          wololo
        </p>
        <InputForm
          // handleChange={(e) => setName(e.target.value)}
          label={"Nom/Pseudo"}
          type={"name"}
        />
        <InputForm
          // handleChange={(e) => setEmail(e.target.value)}
          label={"Email"}
          type={"email"}
        />
        <InputForm
          // handleChange={(e) => setPassword(e.target.value)}
          label={"Mot de passe"}
          type={"password"}
        />
      </Form>
    </>
  );
};

export default Register;
