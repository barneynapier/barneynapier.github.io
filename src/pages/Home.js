import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import postlist from "../posts.json";
import booklist from "../books.json";
import "./styles/Home.css";

export default function HomePage() {
  return (
    <Layout>
      <div className="page-content">
        <p>
          <a
            className="link"
            href="https://twitter.com/barneymade"
            target="_blank"
          >
            Twitter
          </a>
        </p>
        <br />
        <h2>Things I've Done</h2>
        <hr />
        <p>
          <Link className="link" to="/books">
            Books
          </Link>
          : My notes and reviews from {booklist.length} books, originally the
          Bookism website.
        </p>
        <p>
          <a href="https://rollmap.io" target="_blank">
            Rollmap.io
          </a>
          : A BJJ map application that connects students with academies.
        </p>
        <p>
          <a href="https://nano-vert.co.uk" target="_blank">
            Nanovert
          </a>
          : Company that enables people to turn their social
          media posts into shop discounts.
        </p>
        <br />
        <h2>Writing</h2>
        <hr />
        <div className="postlist">
          {postlist.length &&
            postlist.map((post, i) => {
              return (
                <div key={i} className="post-card">
                  <p>
                    {" "}
                    <Link className="link post-link" to={`/post/${post.id}`}>
                      {post.title}
                    </Link>
                    <br />
                    <text className="post-date">{post.date}</text>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}
