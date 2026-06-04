import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container min-h-screen mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
