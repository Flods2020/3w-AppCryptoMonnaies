import React from "react";
import "../styles/index.scss";
import { NavLink } from "react-router-dom";

const BurgerMenu = () => {
  const navLinks = {
    Portefeuille: "/register",
    Ressources: "/",
    Paramètres: "/login",
    SupportClient: "/login",
    Déconnexion: "/login",
  };

  const navLinksEntries = Object.entries(navLinks);

  return (
    <ul className="burger-ul">
      {navLinksEntries.map(([nav, lien, index]) => (
        <NavLink
          to={lien}
          key={index}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <li>{nav}</li>
        </NavLink>
      ))}
    </ul>
  );
};

export default BurgerMenu;
