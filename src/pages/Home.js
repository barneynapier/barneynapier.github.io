import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Layout>
      <div className="page-content">
        <p>
          Hi I'm Barney, and welcome to my site! I essentially use it to share a
          collection of my reading and writing with anybody it might interest.
        </p>
        <p>
          Its main focus is to share with others the books I've read, what I
          learned from them, and what I thought of them. If I cause just one
          person to read a book they otherwise wouldn't read, and enjoy it, then
          I'm happy. So if you're interested in my book notes, then head over to
          my{" "}
          <Link className="link" to="/bookshelf">
            bookshelf
          </Link>
        </p>
        <p>
          If you want to read pieces I've written, then head over to my{" "}
          <Link className="link" to="/writing">
            writing
          </Link>{" "}
          section. I mostly write to consolidate my thoughts about things I'm
          working on, or trying to understand. This usually includes:
          <ul>
            <li>
              <i>Markets</i> - Both financial and otherwise, how they work and
              ways people participate in them
            </li>
            <li>
              <i>Computing</i> - Mostly machine learning, website design and
              logic problems
            </li>
            <li>
              <i>Psychology</i> - Behavioural biases, and how our actions affect
              our brains
            </li>
            <li>
              <i>Philosophy</i> - Mostly the meaning of life, just in case it
              isn't 42
            </li>
          </ul>
          That being said, its my website so I can write about whatever I want
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
        </p>
      </div>
    </Layout>
  );
}
