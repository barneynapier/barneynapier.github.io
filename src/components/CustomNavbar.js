import React from "react";
import { Link } from "react-router-dom";
import CustomNavlink from "../components/CustomNavlink";
import "../styles/CustomNavbar.css";

export default function CustomNavbar() {
  return (
    <div className="navbar">
      <nav expand="md" sticky="top">
        <Link className="navbrand" to={"/"}>
          B. Napier
        </Link>
        <span className="navtabs">
          <CustomNavlink to="/" text="Home" />
          <CustomNavlink to="/about" text="About" />
        </span>
      </nav>
    </div>
  );
}
