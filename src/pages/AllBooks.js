import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import booklist from "../books.json";
import "../styles/AllBooks.css";

const AllBooks = () => {
  return (
    <Layout>
      <div className="welcome-message">
        All reviews of books are independent and my own. If you disagree, well
        then fair enough. At some point I might include Amazon affiliate links
        to each book, as its non-intrusive advertising and if you're getting the
        book anyway then what's the harm in my referring you. But for now that's
        not the case.
      </div>
      <div className="booklist">
        {booklist.length &&
          booklist.map((book, i) => {
            return (
              <div key={i} className="book-card">
                <p>
                  {" "}
                  <Link className="link" to={`/book/${book.id}`}>
                    <img
                      alt={book.title}
                      src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                    ></img>
                    {/* {book.title} */}
                  </Link>
                  {/* {",  "} */}
                  {/* <text className="date">{book.date}</text> */}
                </p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default AllBooks;
