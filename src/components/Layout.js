import React from "react";
import CustomNavbar from "./CustomNavbar";
import "./styles/Layout.css";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <CustomNavbar />
      <div className="layout-body">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
