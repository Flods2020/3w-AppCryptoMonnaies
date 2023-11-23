import "./styles/index.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./router/routes.js";
import { Layout } from "./common/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HeaderLogin from "./components/HeaderLogin.js";
import axios from "axios";
import { setUserData } from "./store/slices/usersSlice.js";
import { baseURL, userDataURL } from "./helper/url_helper.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(({ users }) => users);

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
    if (token && !userProfile.pseudo) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get(`${baseURL}${userDataURL}`)
        .then((res) => dispatch(setUserData(res.data.user)))
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données utilisateur :",
            error
          );
        });
    } else if (!token && userProfile.pseudo === "") {
      navigate("/login");
    }
  }, [token, userProfile, dispatch]);

  return (
    <>
      <Routes>
        {routes.map((route, i) =>
          (route.path === "/login" || route.path === "/register") &&
          (!token || userProfile.pseudo === "") ? (
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
