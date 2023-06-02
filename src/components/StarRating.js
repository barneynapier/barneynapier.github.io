import React from "react";
import "./styles/StarRating.css";

export default function StarRating(props) {
  const stars = props.stars;
  return <div className="star">{stars}</div>;
}
