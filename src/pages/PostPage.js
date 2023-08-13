import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Markdown from "react-markdown";
import postlist from "../posts.json";
import Layout from "../components/Layout";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./styles/PostPage.css";

const PostPage = () => {
  const params = useParams();
  const validId = params.id;
  if (!validId) {
    return <Navigate to="/404" />;
  }
  const fetchedPost = {};
  let postExists = false;
  postlist.forEach((post, i) => {
    if (validId === post.id) {
      fetchedPost.title = post.title ? post.title : "No title given";
      fetchedPost.date = post.date ? post.date : "No date given";
      fetchedPost.content = post.content ? post.content : "No content given";
      postExists = true;
    }
  });
  if (postExists === false) {
    return <Navigate to="/404" />;
  }
  return (
    <Layout>
      <div className="post">
        <div className="title-info">
          <h1 className="page-title">{fetchedPost.title}</h1>
          <small>{fetchedPost.date}</small>
          <hr />
        </div>
        <Markdown
          linkTarget="_blank"
          className="markdown"
          children={fetchedPost.content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </Layout>
  );
};

export default PostPage;
