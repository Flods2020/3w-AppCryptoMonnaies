import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import { routes } from "./router/routes.js";
import { Layout } from "./common/layout/layout";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, i) => (
          <Route
            path={route.path}
            element={<Layout>{route.component}</Layout>}
            key={i}
            exact={true}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
