import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/Home";
import PostPage from "./pages/PostPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
