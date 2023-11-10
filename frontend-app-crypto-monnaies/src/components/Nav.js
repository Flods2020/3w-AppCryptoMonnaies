import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import BurgerMenu from "./BurgerMenu";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL, userDataURL } from "../helper/url_helper";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});

  const ToggleClass = () => {
    setIsActive(!isActive);
  };

  // useEffect(() => {
  //   axios.get(`${baseURL}${userDataURL}`).then((userData) => {
  //     setCurrentUser(userData.data);
  //     console.log(userData.data);
  //   });
  // }, []);

  return (
    <>
      <div className="acm-nav-container">
        <div className="acm-nav-title-burger">
          <NavLink
            to={"/home"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <h2>APP CRYPTO MONNAIES</h2>
            {/* <h3>{currentUser.pseudo}</h3> */}
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
    </>
  );
};

export default Nav;
