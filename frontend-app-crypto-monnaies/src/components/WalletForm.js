import React from "react";

const WalletForm = (props) => {
  return (
    <div className="acm-wallet-form-container">
      <h3>Création de votre portefeuille</h3>
      <form className="acm-wallet-form" onSubmit={props.handleSubmit}>
        {props.children}
        <div className="btn-form">
          <button disabled={props.disabled}>{props.btnSub}</button>
        </div>
      </form>
    </div>
  );
};

export default WalletForm;
