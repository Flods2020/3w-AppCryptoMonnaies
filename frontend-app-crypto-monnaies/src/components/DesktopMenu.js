import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUserData } from "../store/slices/usersSlice";
import { navLinksEntries } from "../helper/Links";

const DesktopMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch(deleteUserData());
      localStorage.removeItem("jwt");
      console.log("User Déconnecté");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="desktop-links-container">
      {navLinksEntries.map(([nav, lien, i]) => (
        <NavLink
          to={lien}
          key={i}
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={nav === "Déconnexion" && logout}
        >
          <li key={i} className="desktop-links">
            {nav.replace("_", " ")}
          </li>
        </NavLink>
      ))}
    </div>
  );
};

export default DesktopMenu;
