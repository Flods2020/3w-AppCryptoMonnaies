import Home from "../pages/Home";
import Login from "../pages/Login";
import MonCompte from "../pages/MonCompte";
import Register from "../pages/Register";
import Ressources from "../pages/Ressources";

const routes = [
  { path: "/", component: <Login /> },
  { path: "/home", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/monCompte", component: <MonCompte /> },
  { path: "/ressources", component: <Ressources /> },
];

export { routes };
