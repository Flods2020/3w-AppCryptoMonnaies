import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { TbPassword } from "react-icons/tb";
import axios from "axios";
import { baseURL, userDataURL } from "../helper/url_helper";
import { editUserData } from "../store/slices/usersSlice";

const MonCompte = () => {
  const userProfileData = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");

  const [displayPseudoInput, setDisplayPseudoInput] = useState(false);
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);
  const [displayEmailInput, setDisplayEmailInput] = useState(false);

  const pseudoInput = document.getElementById("pseudo-input");
  const emailInput = document.getElementById("email-input");

  const setPropName = (inputName) => {
    const inputN = inputName["id"].split("-")[0];
    return inputN;
  };

  const saveInputValue = async (constName, inputName, setFunc, displ) => {
    const propName = setPropName(inputName);
    console.log("propName ::: ", propName);
    let updatedUserProfile = { ...userProfileData };
    for (const key in updatedUserProfile) {
      if (key === propName) {
        updatedUserProfile[propName] = constName;
      }
    }
    await axios
      .put(`${baseURL}${userDataURL}`, updatedUserProfile)
      // .then((res) => console.log(res.data.user));
      .then((res) => dispatch(editUserData(res.data.user)));
    console.log("updatedUserProfile ::: ", updatedUserProfile);
    setFunc(!displ);
  };

  // useEffect(() => {
  //   console.log("pseudo ::: ", pseudo);
  // }, [pseudo]);

  return (
    <div className="acm-home-container">
      <div className="acm-monCompte-container">
        <h2>Mon Compte</h2>
        <div className="id-container">
          <h3>Modifier mes identifiants</h3>
          <div className="modif-id-container">
            <div className="modif-id">
              {!displayPseudoInput ? (
                <span>{userProfileData.pseudo}</span>
              ) : (
                // <span>{pseudo ? pseudo : userProfileData.pseudo}</span>
                <input
                  className="id-modif-inputs"
                  id="pseudo-input"
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              )}
              <div
                className="id-modif-btn"
                id="pseudo-btn"
                onClick={() =>
                  !displayPseudoInput
                    ? setDisplayPseudoInput(!displayPseudoInput)
                    : (saveInputValue(
                        pseudo,
                        pseudoInput,
                        setDisplayPseudoInput,
                        displayPseudoInput
                      ),
                      setPseudo(pseudoInput.value))
                }
              >
                Modifier Pseudo
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
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              <div
                className="id-modif-btn"
                id="email-btn"
                onClick={() =>
                  !displayEmailInput
                    ? setDisplayEmailInput(!displayEmailInput)
                    : (saveInputValue(
                        email,
                        emailInput,
                        setDisplayEmailInput,
                        displayEmailInput
                      ),
                      setEmail(emailInput.value))
                }
              >
                Modifier Email
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
