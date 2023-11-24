import React, { useRef, useState } from "react";
import Portal from "@mui/material/Portal";
import axios from "axios";
import { baseURL, pwdURL } from "../helper/url_helper";

const UpdatePassword = () => {
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");

  const [show, setShow] = useState(false);
  const container = useRef(null);

  const submitPwd = async () => {
    console.log("pwd ::: ", pwd);
    try {
      console.log({ pwd });
      await axios
        .post(`${baseURL}${pwdURL}`, { pwd })
        // .then((res) => console.log(res.data))
        .then((res) => (res.data ? setShow(true) : setShow(false)));
    } catch (error) {
      console.log("error");
    }
    // setShow(!show);
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <div>Entrez votre mdp actuel</div>
      <input
        type="password"
        className="id-modif-inputs"
        id="pwd-input"
        autoComplete="off"
        autoFocus={true}
        onChange={(e) => setPwd(e.target.value ? e.target.value : "")}
      />
      <button type="button" onClick={submitPwd}>
        Envoyer
      </button>
      <div className="portal-container">
        {show ? (
          <>
            <Portal container={container.current}>
              <div>Entrez votre nouveau mdp</div>
              <input type="password" />
              <div>Confirmez votre nouveau mdp</div>
              <input type="text" />
              <button type="button">wololo</button>
            </Portal>
          </>
        ) : null}
      </div>
      <div className="portal-container" ref={container} />
    </div>
  );
};

export default UpdatePassword;
