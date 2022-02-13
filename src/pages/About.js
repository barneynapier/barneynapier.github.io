import React from "react";
import pages from "../pages.json";
import Markdown from "react-markdown";
import Layout from "../components/Layout";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function AboutPage() {
  return (
    <Layout>
      <div className="page-content">
        <Markdown
          linkTarget="_blank"
          children={pages[0].content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </Layout>
  );
}
