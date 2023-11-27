import React, { useRef, useState } from "react";
import Portal from "@mui/material/Portal";
import axios from "axios";
import { baseURL, pwdURL } from "../helper/url_helper";
import { PASSWORD_REGEX } from "../helper/regex";
import { isEmpty } from "lodash";

const UpdatePassword = () => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");

  const [show, setShow] = useState(false);
  const container = useRef(null);

  const checkPwd = async () => {
    if (!isEmpty(currentPwd)) {
      try {
        await axios
          .post(`${baseURL}${pwdURL}`, { currentPwd })
          .then((res) => (res.data ? setShow(true) : setShow(false)));
      } catch {
        alert("Champs mot de passe est actuellement vide.");
      }
    } else {
      alert("Veuillez indiquer votre mot de passe actuel.");
    }
  };

  const changePwd = async () => {
    if (
      !isEmpty(newPwd) &&
      !isEmpty(confirmNewPwd) &&
      newPwd === confirmNewPwd
    ) {
      await axios
        .put(`${baseURL}${pwdURL}`, { pwd: confirmNewPwd })
        .then(() => alert("Votre mot de passe a bien été modifié"))
        .then(() => window.location.reload());
    } else {
      console.error("ERROR");
      alert(
        'Les champs "nouveau mot de passe" et/ou "confimation mot de passe" sont vides ou ne correspondent pas.'
      );
    }
  };

  return (
    <div>
      <div>Entrez votre mot de passe actuel</div>
      <input
        type="password"
        className="id-modif-inputs"
        id="currentPwd-input"
        autoComplete="off"
        autoFocus={true}
        onChange={(e) => setCurrentPwd(e.target.value ? e.target.value : "")}
      />
      <button className="update-password-btn" type="button" onClick={checkPwd}>
        Continuer
      </button>
      <div className="portal-container">
        {show ? (
          <>
            <Portal container={container.current}>
              <div>Entrez votre nouveau mot de passe</div>
              <input
                type="password"
                className="id-modif-inputs"
                id="newPwd-input"
                autoComplete="off"
                autoFocus={true}
                onChange={(e) =>
                  setNewPwd(
                    e.target.value && PASSWORD_REGEX.test(e.target.value)
                      ? e.target.value
                      : ""
                  )
                }
              />
              <div>Confirmez votre nouveau mot de passe</div>
              <input
                type="password"
                className="id-modif-inputs"
                id="confirmNewPwd-input"
                autoComplete="off"
                autoFocus={true}
                onChange={(e) =>
                  setConfirmNewPwd(
                    e.target.value && PASSWORD_REGEX.test(e.target.value)
                      ? e.target.value
                      : ""
                  )
                }
              />
              <button
                className="update-password-btn"
                type="button"
                onClick={changePwd}
              >
                Modifier
              </button>
            </Portal>
          </>
        ) : null}
      </div>
      <div className="portal-container" ref={container} />
    </div>
  );
};

export default UpdatePassword;
