import React from "react";
import "../styles/index.scss";

const BurgerMenu = () => {
  return (
    <ul className="burger-ul">
      <li>Portefeuille</li>
      <li>Ressources</li>
      <li>Paramètres</li>
      <li>Support Client</li>
      <li>Déconnexion</li>
    </ul>
  );
};

export default BurgerMenu;
