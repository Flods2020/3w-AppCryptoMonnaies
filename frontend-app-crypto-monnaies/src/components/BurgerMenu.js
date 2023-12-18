import React, { useState } from "react";
import "../styles/index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUserData } from "../store/slices/usersSlice";
import { navLinksEntries } from "../helper/Links";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToggleLinks = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
      dispatch(deleteUserData());
      localStorage.removeItem("jwt");
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
          {navLinksEntries.map(([nav, lien], i) => (
            <NavLink
              to={lien}
              key={i}
              style={{
                color: nav === "Déconnexion" ? "#e97911" : "#fff",
                textDecoration: "none",
              }}
              onClick={nav === "Déconnexion" ? logout : ToggleLinks}
            >
              <li key={i} onClick={ToggleLinks}>
                {nav.replace("_", " ")}
              </li>
            </NavLink>
          ))}
        </ul>
      )}
    </>
  );
};

export default BurgerMenu;
