import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import BurgerMenu from "./BurgerMenu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../helper/Utils";
import { getUserProfile } from "../store/actions/user.action";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const userProfileData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const findToken = () => {
    const localStorageToken = localStorage.getItem("jwt");
    if (localStorageToken) {
      return localStorageToken;
    } else {
      return "";
    }
  };

  const token = findToken();

  const ToggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (token && !userProfileData) {
      dispatch(getUserProfile());
    }
  }, [userProfileData]);

  return (
    <>
      <div className="acm-nav-container">
        <div className="acm-nav-title-burger">
          <NavLink
            to={"/home"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <h2>APP CRYPTO MONNAIES</h2>
            <h3>{!isEmpty(userProfileData) && userProfileData.user.pseudo}</h3>
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
