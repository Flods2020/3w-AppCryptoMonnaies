import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn("WOLOLO");
    console.error(email);
    console.error(password);
  };

  return (
    <>
      <div className="acm-auth-container">
        <div className="acm-auth">
          <h2>Login</h2>
          <form className="acm-login-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email ::: </label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mdp">Mot de passe ::: </label>
              <input
                type="password"
                name="mdp"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn-form">
              <input type="submit" value={"Connexion"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
