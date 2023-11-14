import React, { useState } from "react";
import "../styles/index.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL, logoutURL } from "../helper/url_helper";

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

  const Logout = async () => {
    try {
      await axios
        .post(`${baseURL}${logoutURL}`)
        .then((response) => console.log(response));
      localStorage.removeItem("jwt");
      console.log("User Déconnecté");
      setIsOpen(!isOpen);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <ul className="burger-ul">
          {navLinksEntries.map(([nav, lien, i]) => (
            <NavLink
              to={lien}
              key={i}
              style={{ color: "inherit", textDecoration: "none" }}
              onClick={nav === "Déconnexion" ? Logout : ToggleLinks}
            >
              <li key={i} onClick={ToggleLinks}>
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
