import Home from "../pages/Home";
import Login from "../pages/Login";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/login", component: <Login /> },
];

export { routes };
