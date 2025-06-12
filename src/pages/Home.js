import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import postlist from "../posts.json";
import "./styles/Home.css";

export default function HomePage() {
  return (
    <Layout>
      <div className="page-content">
        <p>
          <a
            className="link"
            href="https://twitter.com/barney_napier"
            target="_blank"
          >
            Twitter
          </a>
        </p>
        <br />
        <h2>Projects</h2>
        <hr />
        <p>
          <a href="https://bookism.co.uk" target="_blank">
            Bookism
          </a>
          : Personal website of book notes and reviews. 
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
