import React, { useState } from "react";
import "../styles/index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUserData } from "../store/slices/usersSlice";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(deleteUserData());
      localStorage.removeItem("jwt");
      console.log("User Déconnecté");
      setIsOpen(!isOpen);
      navigate("/login");
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
