import Nav from "../../components/Nav";

export const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="layout">{children}</div>
    </>
  );
};
