import React from "react";
import Layout from "../components/Layout";
import booklist from "../books.json";
import "./styles/AllBooks.css";
import BookCard from "../components/BookCard";

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
      <div className="book-grid">
        {booklist.length &&
          booklist.map((book, i) => {
            return <BookCard book={book} key={i}></BookCard>;
          })}
      </div>
    </Layout>
  );
};

export default AllBooks;
