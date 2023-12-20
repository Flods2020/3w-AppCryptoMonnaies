import React, { useState } from "react";
import "../styles/index.scss";
import BurgerMenu from "../components/BurgerMenu";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../helper/Utils";
import { useSelector } from "react-redux";
import DesktopMenu from "../components/DesktopMenu";

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
            <div
              className="logoAndTitle-container"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="logoContainer" style={{ marginRight: "15px" }}>
                <img
                  style={{ height: "50px", width: "50px" }}
                  src="../assets/logo/logoACM.jpg"
                  alt="APP-CRYPTO-MONNAIES-logo"
                  id="logo"
                />
              </div>
              <h2>APP CRYPTO MONNAIES</h2>
            </div>
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
