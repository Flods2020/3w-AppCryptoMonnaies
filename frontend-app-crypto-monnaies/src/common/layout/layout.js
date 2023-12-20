import Footer from "../Footer";
import Nav from "../Nav";

export const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};
