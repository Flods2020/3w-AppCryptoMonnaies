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
            <span>{userProfileData.email}</span>
            <div className="id-modif-btn" id="email-btn">
              Modifier Email
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;
