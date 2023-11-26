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
      console.log("currentPwd ::: ", currentPwd);
      try {
        console.log({ currentPwd });
        await axios
          .post(`${baseURL}${pwdURL}`, { currentPwd })
          // .then((res) => console.log(res.data))
          .then((res) => (res.data ? setShow(true) : setShow(false)));
      } catch (error) {
        console.log("error");
      }
    } else {
      alert("Veuillez indiquer votre mdp actuel.");
    }
    // setShow(!show);
  };

  const changePwd = () => {
    if (
      !isEmpty(newPwd) &&
      !isEmpty(confirmNewPwd) &&
      newPwd === confirmNewPwd
    ) {
      console.log("newPwd ::: ", newPwd);
      console.log("confirmNewPwd ::: ", confirmNewPwd);
    } else {
      console.error("ERROR");
      alert(
        'Les champs "nouveau mdp" et/ou "confimation mdp" sont vides ou ne correspondent pas.'
      );
    }
    // setShow(!show);
  };

  return (
    <div>
      <div>Entrez votre mdp actuel</div>
      <input
        type="password"
        className="id-modif-inputs"
        id="currentPwd-input"
        autoComplete="off"
        autoFocus={true}
        onChange={(e) => setCurrentPwd(e.target.value ? e.target.value : "")}
      />
      <button type="button" onClick={checkPwd}>
        Envoyer
      </button>
      <div className="portal-container">
        {show ? (
          <>
            <Portal container={container.current}>
              <div>Entrez votre nouveau mdp</div>
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
              <div>Confirmez votre nouveau mdp</div>
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
              <button type="button" onClick={changePwd}>
                wololo
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
