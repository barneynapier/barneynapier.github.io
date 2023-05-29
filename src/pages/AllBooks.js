import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import booklist from "../books.json";
import "../styles/AllBooks.css";

const AllBooks = () => {
  return (
    <Layout>
      <p className="welcome-message">
        All reviews of books are independent and my own. If you disagree, well
        then fair enough. At some point I might include Amazon affiliate links
        to each book, as its non-intrusive advertising and if you're getting the
        book anyway then what's the harm in my referring you. But for now that's
        not the case.
      </p>
      <div className="grid-container">
        {booklist.length &&
          booklist.map((book, i) => {
            return (
              <div key={i} className="grid-item">
                <Link className="link" to={`/book/${book.id}`}>
                  <img
                    className="grid-item-image"
                    alt={book.title}
                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                  ></img>
                  <p className="grid-item-title">{book.title}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default AllBooks;
