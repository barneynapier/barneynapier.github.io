import React from "react";

import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import PostPage from "./pages/PostPage";
import AllPosts from "./pages/AllPosts";
import NotFound from "./pages/NotFound";
import AllBooks from "./pages/AllBooks";
import BookPage from "./pages/BookPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/writing" element={<AllPosts />} />
        <Route path="/bookshelf" element={<AllBooks />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
