import React, { useState } from "react";
import "../styles/index.scss";
import { NavLink } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navLinks = {
    Portefeuille: "/register",
    Ressources: "/",
    Paramètres: "/login",
    SupportClient: "/login",
    Déconnexion: "/login",
  };

  const navLinksEntries = Object.entries(navLinks);

  const ToggleLinks = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <ul className="burger-ul">
          {navLinksEntries.map(([nav, lien, index]) => (
            <NavLink
              to={lien}
              key={index}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <li key={index} onClick={ToggleLinks}>
                {nav}
              </li>
            </NavLink>
          ))}
        </ul>
      )}
    </>
  );
};

export default BurgerMenu;
