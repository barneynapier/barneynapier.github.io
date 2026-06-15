import React from "react";

// Renders a 0–5 star rating as filled/empty stars.
export default function StarRating({ rating }) {
  const value = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return (
    <span className="star-rating" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}
