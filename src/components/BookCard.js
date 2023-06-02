import React from "react";
import { Link } from "react-router-dom";
import "./styles/BookCard.css";

export default function BookCard(props) {
  return (
    <Link className="book-card" to={`/book/${props.book.id}`}>
      <div key={props.key}>
        <img
          className="book-card-image"
          alt={props.book.title}
          src={`https://covers.openlibrary.org/b/isbn/${props.book.isbn}-M.jpg`}
        ></img>
        <div className="book-card-info">
          <p className="book-card-title">{props.book.title}</p>
          <p className="book-card-author">{props.book.author}</p>
        </div>
      </div>
    </Link>
  );
}
