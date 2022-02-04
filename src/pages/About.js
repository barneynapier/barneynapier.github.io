import React from "react";
import pages from "../pages.json";
import Markdown from "react-markdown";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="page-content">
        <Markdown linkTarget="_blank" children={pages[0].content} />
      </div>
    </Layout>
  );
}
