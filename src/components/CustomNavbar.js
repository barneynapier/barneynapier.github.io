import React from "react";
import { Link } from "react-router-dom";
import "./styles/CustomNavbar.css";

export default function CustomNavbar() {
  return (
    <div className="navbar">
      <nav sticky="top">
        <Link className="navbrand" to={"/"}>
          B. Napier
        </Link>
      </nav>
    </div>
  );
}
