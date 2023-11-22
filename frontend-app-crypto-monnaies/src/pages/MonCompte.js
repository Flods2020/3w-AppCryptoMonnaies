import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useSelector } from "react-redux";
import { TbPassword } from "react-icons/tb";

const MonCompte = () => {
  const userProfileData = useSelector((state) => state.users);

  const [newPseudo, setNewPseudo] = useState("");

  const [displayPseudoInput, setDisplayPseudoInput] = useState(false);
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);
  const [displayEmailInput, setDisplayEmailInput] = useState(false);

  const pseudoInput = document.getElementById("pseudo-input");

  const saveInputValue = (constName, setFunc, displ) => {
    // appeler axios patch
    console.log(constName);
    setFunc(!displ);
  };

  useEffect(() => {
    // if (newPseudo !== "") {
    //   newPseudo;
    // } else {
    //   setNewPseudo(userProfileData.pseudo);
    // }
    console.log("newPseudo ::: ", newPseudo);
  }, [newPseudo]);

  return (
    <div className="acm-home-container">
      <div className="acm-monCompte-container">
        <h2>Mon Compte</h2>
        <div className="id-container">
          <h3>Modifier mes identifiants</h3>
          <div className="modif-id-container">
            <div className="modif-id">
              {!displayPseudoInput ? (
                // <span>{userProfileData.pseudo}</span>
                <span>{newPseudo ? newPseudo : userProfileData.pseudo}</span>
              ) : (
                <input
                  className="id-modif-inputs"
                  id="pseudo-input"
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(e) => setNewPseudo(e.target.value)}
                />
              )}
              <div
                className="id-modif-btn"
                id="pseudo-btn"
                onClick={() =>
                  !displayPseudoInput
                    ? setDisplayPseudoInput(!displayPseudoInput)
                    : (saveInputValue(
                        newPseudo,
                        setDisplayPseudoInput,
                        displayPseudoInput
                      ),
                      setNewPseudo(pseudoInput.value))
                }
              >
                Modifier Pseudo
              </div>
            </div>
            <div className="modif-id">
              {!displayPasswordInput ? (
                <span>
                  <TbPassword />
                  <TbPassword />
                  <TbPassword />
                  <TbPassword />
                </span>
              ) : (
                <input
                  className="id-modif-inputs"
                  id="password-input"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                />
              )}
              <div
                className="id-modif-btn"
                id="password-btn"
                onClick={() => setDisplayPasswordInput(!displayPasswordInput)}
              >
                Modifier Mot de passe
              </div>
            </div>
            <div className="modif-id">
              {!displayEmailInput ? (
                <span>{userProfileData.email}</span>
              ) : (
                <input
                  className="id-modif-inputs"
                  id="email-input"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                />
              )}
              <div
                className="id-modif-btn"
                id="email-btn"
                onClick={() => setDisplayEmailInput(!displayEmailInput)}
              >
                Modifier Email
              </div>
            </div>
          </div>
        </div>
        <div className="delete-container">
          <h3>Suppressions</h3>
          <div className="delete-account">
            <div className="delete-btn" id="delete-wallet-btn">
              Supprimer mon portefeuille
            </div>
            <div className="delete-btn" id="delete-account-btn">
              SUPPRIMER MON COMPTE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;
