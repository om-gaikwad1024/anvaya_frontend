import { Outlet } from "react-router-dom";
import Footer from "./src/components/Footer";
import Navbar from "./src/components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;