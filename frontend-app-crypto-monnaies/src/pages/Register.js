import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import InputForm from "../components/InputForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { baseURL, registerURL } from "../helper/url_helper";
import { useNavigate } from "react-router-dom";
import { MAIL_REGEX, PASSWORD_REGEX, USER_REGEX } from "../helper/regex";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${baseURL}${registerURL}`, {
          user,
          pwd,
          mail,
        })
        .then((response) => console.log(response.data.user));

      console.log("formulaire valide");
      navigate("/login");
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <Form
        formType={"register"}
        handleSubmit={handleSubmit}
        btnSub={"S'inscrire"}
        disabled={
          !validPwd || !validName || !validMatch || !validMail ? true : false
        }
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
          handleChange={(e) => setMail(e.target.value)}
          type={"email"}
          name={"email"}
          label={"E-mail"}
          valid={validMail}
          varia={mail}
          aria-invalid={validMail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setMailFocus(true)}
          onBlur={() => setMailFocus(false)}
        />
        <p
          id="emailnote"
          className={mailFocus && !validMail ? "instructions" : "offscreen"}
        >
          <AiOutlineInfoCircle /> <br />
          Ce champs doit contenir au moins un caractère alphanumérique (lettres
          ou chiffres). <br />
          Ne peut pas contenir d'espaces ou de caractères spéciaux autres que
          les tirets, les caractères de soulignement et les points. <br />
          L'adresse e-mail doit contenir le symbole "@". <br />
          La partie de domaine doit être suivie par un point et une extension de
          domaine (par exemple, ".com", ".org", ".fr", etc.). <br />
        </p>
      </Form>
    </>
  );
};

export default Register;
