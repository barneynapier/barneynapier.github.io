import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import postlist from "../posts.json";
import "../styles/AllPosts.css";

const AllPosts = () => {
  return (
    <Layout>
      <div className="welcome-message">
        Hi there, I'm Barney and welcome to my site. Below is a list of my
        writing on various topics. If you want to read my book notes and
        reviews, head over to my{" "}
        <Link className="link" to={`/bookshelf`}>
          bookshelf
        </Link>
      </div>
      <br />
      <hr />
      <div className="postlist">
        {postlist.length &&
          postlist.map((post, i) => {
            return (
              <div key={i} className="post-card">
                <p>
                  {" "}
                  <Link className="link" to={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                  {",  "}
                  <text className="date">{post.date}</text>
                </p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default AllPosts;
