import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Form = (props) => {
  useEffect(() => {}, [props.disabled]);

  return (
    <div className="acm-auth-container">
      <div className="acm-auth">
        {props.formType === "register" ? (
          <h2>CRÉER UN COMPTE</h2>
        ) : (
          <h2>SE CONNECTER</h2>
        )}
        <form className="acm-login-form" onSubmit={props.handleSubmit}>
          {props.children}
          <div className="btn-form">
            <button disabled={props.disabled}>{props.btnSub}</button>
          </div>

          {props.formType === "register" ? (
            <p>
              <br />
              Vous avez déjà un compte ? <br />
              <span className="accountLink">
                <NavLink to={"/login"}>Se connecter</NavLink>
              </span>
            </p>
          ) : (
            <p>
              <br />
              Vous n'avez pas encore de compte ? <br />
              <span className="accountLink">
                <NavLink to={"/register"}>S'inscrire</NavLink>
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
