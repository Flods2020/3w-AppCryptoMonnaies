import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUserData } from "../store/slices/usersSlice";
import { navLinksEntries } from "../helper/Links";

const DesktopMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrollTop, setScrollTop] = useState("0rem");
  const [newScroll, setNewScroll] = useState(0);

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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        if (window.scrollY > newScroll) {
          setScrollTop("-15rem");
        } else {
          setScrollTop("0rem");
        }
      }
      setNewScroll(window.scrollY);
    });
  }, [newScroll, scrollTop]);

  return (
    <div
      className="desktop-links-container"
      style={{
        transform: `translateY(${scrollTop})`,
        transition: "transform 0.5s ease",
      }}
    >
      {navLinksEntries.map(([nav, lien, i]) => (
        <NavLink
          to={lien}
          key={i}
          style={{
            color: nav === "Déconnexion" ? "#e97911" : "inherit",
            textDecoration: "none",
          }}
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
