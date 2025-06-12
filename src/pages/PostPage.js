import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Markdown from "react-markdown";
import postlist from "../posts.json";
import Layout from "../components/Layout";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./styles/PostPage.css";

const PostPage = () => {
  const { id } = useParams();
  
  // Find the post with matching id
  const post = postlist.find(post => post.id === id);
  
  // If no post found, redirect to 404
  if (!post) {
    return <Navigate to="/404" />;
  }

  // Ensure tags is always an array
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <Layout>
      <article className="post">
        <header className="post-header">
          <h1 className="page-title">{post.title}</h1>
          <div className="post-meta">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
            {tags.length > 0 && (
              <div className="post-tags">
                {tags.map(tag => (
                  <Link key={tag} to={`/tag/${tag}`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <hr />
        </header>
        
        <div className="post-content">
          <Markdown
            children={post.content}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // Add custom rendering for links to open in new tab
              a: ({node, ...props}) => (
                <a target="_blank" rel="noopener noreferrer" {...props} />
              ),
              // Ensure images are responsive
              img: ({node, ...props}) => (
                <img className="responsive-image" {...props} alt={props.alt || ''} />
              )
            }}
          />
        </div>

        <footer className="post-footer">
          <div className="post-navigation">
            {postlist.map((p, index) => {
              if (p.id === post.id) {
                return (
                  <div key="navigation" className="post-nav-links">
                    {index > 0 && (
                      <Link to={`/post/${postlist[index - 1].id}`} className="prev-post">
                        ← {postlist[index - 1].title}
                      </Link>
                    )}
                    {index < postlist.length - 1 && (
                      <Link to={`/post/${postlist[index + 1].id}`} className="next-post">
                        {postlist[index + 1].title} →
                      </Link>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </footer>
      </article>
    </Layout>
  );
};

export default PostPage;
