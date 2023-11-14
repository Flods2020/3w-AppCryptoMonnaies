import "./styles/index.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./router/routes.js";
import { Layout } from "./common/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { addUserProfile, getUserProfile } from "./store/actions/user.action.js";
import { useEffect } from "react";
import Login from "./pages/Login.js";
import HeaderLogin from "./components/HeaderLogin.js";
import Register from "./pages/Register.js";
import configureAppStore from "./store/store.js";

function App() {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const store = configureAppStore();

  // store.dispatch(getUserProfile());

  const findToken = () => {
    const localStorageToken = localStorage.getItem("jwt");
    if (localStorageToken) {
      return localStorageToken;
    } else {
      return "";
    }
  };

  const token = findToken();

  useEffect(() => {
    console.log("user ::: ", user);
    console.log("token ::: ", token);
    if (token && user) {
      // dispatch(addUserProfile(user));
      // navigate("/home");
      dispatch(getUserProfile());
    } else if (!token && user) {
      console.log("Pas de Store Token");
    } else if (token && !user) {
      console.log("Pas de User");
      // dispatch(getUserProfile());
      localStorage.removeItem("jwt");
      navigate("/login");
    } else {
      localStorage.removeItem("jwt");
      console.log("Pas de User connecté");
      navigate("/login");
    }
  }, [token]);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     dispatch(addUserProfile(user));
  //   } else {
  //     // localStorage.removeItem("jwt");
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <>
      <Routes>
        {routes.map((route, i) =>
          (route.path === "/login" || route.path === "/register") && !token ? (
            <Route
              path={route.path}
              element={
                <>
                  <HeaderLogin />
                  {route.component}
                </>
              }
              key={i}
              exact={true}
            />
          ) : (
            <Route
              path={route.path}
              element={<Layout>{route.component}</Layout>}
              key={i}
              exact={true}
            />
          )
        )}
      </Routes>
    </>
  );
}

export default App;
