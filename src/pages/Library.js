import React from "react";
import pages from "../pages.json";
import Markdown from "react-markdown";
import Layout from "../components/Layout";

export default function Library() {
  return (
    <Layout>
      <div className="page-content">
        <Markdown linkTarget="_blank" children={pages[1].content} />
      </div>
    </Layout>
  );
}
