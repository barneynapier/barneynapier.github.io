import React from "react";
import { Link } from "react-router-dom";
import "./styles/CustomNavlink.css";

export default function CustomNavlink(props) {
  // This function tells me if the link is shown

  function isCurrentLink() {
    const currentLink = window.location.href.substring(
      window.location.href.lastIndexOf("/")
    );

    if (currentLink === props.to) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Link
      className="navlink"
      to={props.to}
      style={{
        borderBottom: isCurrentLink() ? "solid 1px" : "None",
      }}
    >
      {props.text}
    </Link>
  );
}
