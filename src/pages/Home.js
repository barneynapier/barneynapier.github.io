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
          I'm Barney, I'm currently a quant researcher at a hedge fund but am
          interested in a lot of random things too. Sometimes I write about
          things that interest me (usually relating to markets, computing, or
          philosophy), and you can find those writings below.
        </p>
        <p>
          If you want to get in touch and chat about something, just drop me a
          line on{" "}
          <a
            className="link"
            href="https://twitter.com/barney_napier"
            target="_blank"
          >
            Twitter
          </a>
          . I prefer it to email, because I can block you if I want.
        </p>
        <br />
        <h2>Projects</h2>
        <hr />
        <p>
          <a href="https://bookism.co.uk" target="_blank">
            Bookism
          </a>
          : A website devoted to helping people read better for longer. It's a
          combination of posts about what you should and could read, as well as
          an extensive database of my own personal book reviews.
        </p>
        <p>
          <a href="">Jitsmap</a>: (Site pending) I train in Brazilian Jiu Jitsu
          and love it. I often take notes on techniques to better understand how
          everything fits together. All my notes are in a graph based notes tool
          called obsidian. So my BJJ notes are like a large map which I have
          published online to help others improve in the early stages of their
          BJJ journey.
        </p>
        <p>
          <a href="https://nano-vert.co.uk" target="_blank">
            Nanovert
          </a>
          : I co-founded a company that enables people to turn their social
          media posts into discounts at local shops.
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
