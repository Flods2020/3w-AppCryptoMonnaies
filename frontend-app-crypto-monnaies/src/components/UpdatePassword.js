import React, { useRef, useState } from "react";
import Portal from "@mui/material/Portal";

const UpdatePassword = () => {
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");

  const [show, setShow] = useState(false);
  const container = useRef(null);

  const submitPwd = () => {
    console.log("pwd ::: ", pwd);
    setShow(!show);
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
