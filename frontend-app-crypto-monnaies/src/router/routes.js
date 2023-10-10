import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
];

export { routes };
