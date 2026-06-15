import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/Home";
import PostPage from "./pages/PostPage";
import BooksPage from "./pages/Books";
import BookPage from "./pages/Book";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
