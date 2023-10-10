import React, { useEffect } from "react";

const Form = (props) => {
  useEffect(() => {
    console.log("props.formType ::: ", props.formType);
  });

  return (
    <div className="acm-auth-container">
      <div className="acm-auth">
        {props.formType === "register" ? (
          <h2>CRÉER UN COMPTE</h2>
        ) : (
          <h2>{props.formType.toUpperCase()}</h2>
        )}
        <form className="acm-login-form" onSubmit={props.handleSubmit}>
          {props.children}
          <div className="btn-form">
            <input type="submit" value={props.btnSub} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
