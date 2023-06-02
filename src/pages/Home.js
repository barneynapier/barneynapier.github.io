import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Layout>
      <div className="page-content">
        <p>
          Hi, I'm Barney, and I put this site together to share my notes/reviews
          of books I've read. As well as anything else I feel like writing
          about.
        </p>
        <p>
          They way I see it, if I cause so much as a single person to read a
          book they otherwise wouldn't read, and benefit from it, then I'm
          happy. So if you're interested in my book notes, then head over to my{" "}
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
          working on, or trying to understand, which usually includes:
          <ul>
            <li>
              Markets - Both financial and otherwise, how they work and ways
              people participate in them
            </li>
            <li>
              Computing - Mostly machine learning, website design and logic
              problems
            </li>
            <li>
              Psychology - Behavioural biases, and how our actions affect our
              brains
            </li>
            <li>
              Philosophy - Mostly the meaning of life, just in case it isn't 42
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
          . I prefer it to email, because I can block you if I want.
        </p>
      </div>
    </Layout>
  );
}
