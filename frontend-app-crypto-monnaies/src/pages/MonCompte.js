import React, { useState } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { TbPassword } from "react-icons/tb";
import axios from "axios";
import { baseURL, userDataURL } from "../helper/url_helper";
import { editUserData } from "../store/slices/usersSlice";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { MAIL_REGEX, USER_REGEX } from "../helper/regex";
import SimplePortal from "../components/UpdatePassword";

const MonCompte = () => {
  const userProfileData = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");

  const [displayPseudoInput, setDisplayPseudoInput] = useState(false);
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);
  const [displayEmailInput, setDisplayEmailInput] = useState(false);

  const saveInputValue = async (constName, inputName, setFunc, displ) => {
    let updatedUserProfile = { ...userProfileData };
    for (const key in updatedUserProfile) {
      if (key === inputName) {
        updatedUserProfile[inputName] = constName;
      }
    }
    await axios
      .put(`${baseURL}${userDataURL}`, updatedUserProfile)
      .then((res) => dispatch(editUserData(res.data.user)))
      .then(() => alert(`Votre ${inputName} a bien été modifié.`));
    setFunc(!displ);
  };

  const checkRegex = (inputName, setFunc, displ) => {
    alert(
      `${inputName.charAt(0).toUpperCase() + inputName.slice(1)} incorrect`
    );
    setFunc(!displ);
  };

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
                <input
                  className="id-modif-inputs"
                  id="pseudo-input"
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(e) =>
                    setPseudo(
                      e.target.value ? e.target.value : userProfileData.pseudo
                    )
                  }
                />
              )}
              <div
                className="id-modif-btn"
                id="pseudo-btn"
                onClick={() =>
                  !displayPseudoInput
                    ? setDisplayPseudoInput(!displayPseudoInput)
                    : USER_REGEX.test(pseudo)
                    ? saveInputValue(
                        pseudo,
                        "pseudo",
                        setDisplayPseudoInput,
                        displayPseudoInput
                      )
                    : checkRegex(
                        "pseudo",
                        setDisplayPseudoInput,
                        displayPseudoInput
                      )
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
                  onChange={(e) =>
                    setEmail(
                      e.target.value ? e.target.value : userProfileData.email
                    )
                  }
                />
              )}
              <div
                className="id-modif-btn"
                id="email-btn"
                onClick={() =>
                  !displayEmailInput
                    ? setDisplayEmailInput(!displayEmailInput)
                    : MAIL_REGEX.test(email)
                    ? saveInputValue(
                        email,
                        "email",
                        setDisplayEmailInput,
                        displayEmailInput
                      )
                    : checkRegex(
                        "email",
                        setDisplayEmailInput,
                        displayEmailInput
                      )
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
                // <input
                //   className="id-modif-inputs"
                //   id="password-input"
                //   type="password"
                //   onChange={(e) => console.log(e.target.value)}
                // />
                <SimplePortal />
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
          <h3>Supprimer</h3>
          <div className="delete-account">
            <div className="delete-btn" id="delete-wallet-btn">
              Supprimer mon portefeuille
            </div>
            <div className="delete-btn" id="delete-account-btn">
              <DeleteAccountButton userEmail={userProfileData.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;
