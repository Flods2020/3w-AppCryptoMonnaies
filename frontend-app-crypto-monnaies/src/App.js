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
import { setCryptosData } from "./store/slices/cryptosSlice.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(({ users }) => users);

  const acmCryptos = ["btc", "eth", "usdt", "usdc", "busd"];

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      navigate("/login");
    }
  }, [token, userProfile, dispatch]);

  useEffect(() => {
    if (token && userProfile.pseudo !== "") {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
        )
        .then(
          (res) =>
            res.data &&
            dispatch(
              setCryptosData(
                res.data.filter((coin) => acmCryptos.includes(coin.symbol))
              )
            )
        );
    }
  }, [acmCryptos]);

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
