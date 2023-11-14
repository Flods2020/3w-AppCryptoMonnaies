import React, { useState } from "react";
import "../styles/index.scss";
import BurgerMenu from "./BurgerMenu";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const userProfileData = useSelector((state) => state.userReducer);

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
            <h3>{userProfileData && userProfileData.user.pseudo}</h3>
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
