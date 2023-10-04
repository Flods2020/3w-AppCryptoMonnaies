import React, { useState } from "react";
import "../styles/index.scss";
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const ToggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="acm-nav-container">
        <div className="acm-nav-title-burger">
          <h2>APP CRYPTO MONNAIES</h2>
          <div className="burger-container" onClick={ToggleClass}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {isActive ? (
          <div>
            <BurgerMenu />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Nav;
