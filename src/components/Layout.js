import React from "react";
import CustomNavbar from "./CustomNavbar";
import "./styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <CustomNavbar />
      <div className="layout-body">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
