import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Markdown from "react-markdown";
import StarRating from "../components/StarRating";
import booklist from "../books.json";
import Layout from "../components/Layout";
import "./styles/Book.css";

const BookPage = () => {
  const { id } = useParams();
  const index = booklist.findIndex((book) => book.id === id);

  if (index === -1) {
    return <Navigate to="/404" />;
  }

  const book = booklist[index];
  const tags = Array.isArray(book.tags) ? book.tags : [];

  return (
    <Layout>
      <article className="post book">
        <header className="book-header">
          <img
            className="book-detail-cover"
            src={process.env.PUBLIC_URL + book.cover}
            alt={`${book.title} cover`}
          />
          <div className="book-detail-meta">
            <h1 className="page-title">{book.title}</h1>
            <p className="book-detail-author">{book.author}</p>
            <p className="book-detail-rating">
              <StarRating rating={book.rating} />
            </p>
            <p className="book-detail-info">
              {book.isFiction ? "Fiction" : "Non-fiction"} ·{" "}
              <time dateTime={book.date}>
                {new Date(book.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </time>
            </p>
            {tags.length > 0 && (
              <div className="post-tags">
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        <hr />

        <div className="post-content markdown">
          <Markdown
            children={book.content}
            components={{
              a: ({ node, ...props }) => (
                <a target="_blank" rel="noopener noreferrer" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="responsive-image" {...props} alt={props.alt || ""} />
              ),
            }}
          />
        </div>

        <footer className="post-footer">
          <div className="post-nav-links">
            {index > 0 && (
              <Link to={`/book/${booklist[index - 1].id}`} className="prev-post">
                ← {booklist[index - 1].title}
              </Link>
            )}
            {index < booklist.length - 1 && (
              <Link to={`/book/${booklist[index + 1].id}`} className="next-post">
                {booklist[index + 1].title} →
              </Link>
            )}
          </div>
          <p className="back-to-books">
            <Link className="link" to="/books">
              ← All books
            </Link>
          </p>
        </footer>
      </article>
    </Layout>
  );
};

export default BookPage;
