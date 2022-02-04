import React from "react";
import { Link } from "react-router-dom";
import postlist from "../posts.json";
import "../styles/PostList.css";

const PostList = () => {
  return (
    <div className="postlist">
      {postlist.length &&
        postlist.map((post, i) => {
          return (
            <div key={i} className="post-card">
              <li>
                {post.date}{" "}
                <Link className="link" to={`/post/${post.id}`}>
                  {post.title}
                </Link>
              </li>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
