import "./styles/index.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./router/routes.js";
import { Layout } from "./common/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HeaderLogin from "./components/HeaderLogin.js";
import axios from "axios";
import { getTransactions } from "./store/actions/transaction.action.js";
import { getUserProfile } from "./store/actions/user.action.js";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }

    dispatch(getTransactions());
    dispatch(getUserProfile());
  }, [dispatch, token]);

  return (
    <>
      <Routes>
        {routes.map((route, i) =>
          (route.path === "/login" || route.path === "/register") &&
          (!token || !user) ? (
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
