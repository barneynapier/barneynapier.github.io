import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import booklist from "../books.json";
import "./styles/Books.css";

export default function BooksPage() {
  return (
    <Layout>
      <div className="page-content">
        <h1 className="page-title">Books</h1>
        <p>
          Notes and reviews from {booklist.length} books I've read, newest
          first.
        </p>
        <hr />
        <div className="book-grid">
          {booklist.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="book-card">
              <img
                className="book-cover"
                src={process.env.PUBLIC_URL + book.cover}
                alt={`${book.title} cover`}
                loading="lazy"
              />
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
              <StarRating rating={book.rating} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
