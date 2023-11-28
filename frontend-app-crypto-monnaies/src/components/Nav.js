import React, { useState } from "react";
import "../styles/index.scss";
import BurgerMenu from "./BurgerMenu";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../helper/Utils";
import { useSelector } from "react-redux";
import DesktopMenu from "./DesktopMenu";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);

  const userProfile = useSelector((state) => state.users);

  const ToggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="acm-nav-container">
        <div className="acm-nav-title-burger">
          <NavLink
            to={"/home"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <h2>APP CRYPTO MONNAIES</h2>
            <h3>{!isEmpty(userProfile) && userProfile.pseudo}</h3>
          </NavLink>
          <div className="burger-container" onClick={ToggleClass}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {isActive ? (
          <div onClick={ToggleClass}>
            <BurgerMenu />
          </div>
        ) : null}
      </div>
      <div className="desktop-menu-container">
        <DesktopMenu />
      </div>
    </>
  );
};

export default Nav;
