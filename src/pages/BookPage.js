import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Markdown from "react-markdown";
import booklist from "../books.json";
import Layout from "../components/Layout";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const BookPage = () => {
  const params = useParams();
  const validId = params.id;
  if (!validId) {
    return <Navigate to="/404" />;
  }
  const fetchedbook = {};
  let bookExists = false;
  booklist.forEach((book, i) => {
    if (validId === book.id) {
      fetchedbook.title = book.title ? book.title : "No title given";
      fetchedbook.author = book.author ? book.author : "No author given";
      fetchedbook.date = book.date ? book.date : "No date given";
      fetchedbook.rating = book.rating ? book.rating : "No rating given";
      fetchedbook.content = book.content ? book.content : "No content given";
      bookExists = true;
    }
  });
  if (bookExists === false) {
    return <Navigate to="/404" />;
  }
  return (
    <Layout>
      <div className="book">
        <h1>{fetchedbook.title}</h1>
        <small>Published on {fetchedbook.date}</small>
        <hr />
        <Markdown
          linkTarget="_blank"
          children={fetchedbook.content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </Layout>
  );
};

export default BookPage;
