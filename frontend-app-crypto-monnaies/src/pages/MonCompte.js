import React from "react";
import "../styles/index.scss";
import { useSelector } from "react-redux";
import { TbPassword } from "react-icons/tb";

const MonCompte = () => {
  const userProfileData = useSelector((state) => state.users);

  return (
    <div className="acm-home-container">
      <div className="acm-monCompte-container">
        <h2>Mon Compte</h2>
        <div className="id-container">
          <h3>Modifier mes identifiants</h3>
          <div className="modif-id">
            <span>{userProfileData.pseudo}</span>
            <div className="id-modif-btn" id="pseudo-btn">
              Modifier Pseudo
            </div>
          </div>
          <div className="modif-id">
            <span>
              <TbPassword />
              <TbPassword />
              <TbPassword />
              <TbPassword />
            </span>
            <div className="id-modif-btn" id="password-btn">
              Modifier Mot de passe
            </div>
          </div>
          <div className="modif-id">
            <span>{userProfileData.email.replace("@", " @")}</span>
            <div className="id-modif-btn" id="email-btn">
              Modifier Email
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
